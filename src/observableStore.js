import {extendObservable, toJS} from 'mobx';
import axios from 'axios';

class ObservableStore {

  // TODO authorization
  // TODO loader on load/save data

  constructor() {
    extendObservable(this, {
      data: [],
      users: [],
      exercises: [],

      activeType: null,
      activeUsers: {},
      activeExercise: null,

      isAddDataDialogShown: false,//TODO
      chartLoader: false,// TODO
      addDataDialogLoader: false//TODO
    });

    this.dataSource = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL
    });
  }

  /**
   * Getters/Setters
   */

  /**
   * Set chart data
   * @param data
   */
  setData = (data) => {
    this.data = {...data};
  };

  /**
   * Get data by exercise
   */
  getData = () => {
    const activeExercise = this.getActiveExercise();

    return this.data[activeExercise] ? this.data[activeExercise].map(item => toJS(item)) : [];
  };

  /**
   * Get users list
   * @returns {Array}
   */
  getUsers = () => {
    return toJS(this.users);
  };

  /**
   * Set users list
   * @param users
   */
  setUsers = (users) => {
    this.users = [...users];
  };

  /**
   * Set default active users
   * @param users
   */
  setDefaultActiveUsers = (users) => {
    let activeUsers = {};
    let usersIds = users.map(user => user.id);

    for (let userId of usersIds) {
      activeUsers[userId] = true;
    }

    this.activeUsers = {...activeUsers};
  };

  /**
   * Set exercises list
   * @param exercises
   */
  setExercises = (exercises) => {
    this.exercises = [...exercises];
  };

  /**
   * Get exercises list
   * @returns {Array|styles.exercises|{width}|[*]|*}
   */
  getExercises = () => {
    return this.exercises;
  };

  /**
   * Get active exercise type
   * @returns {null|*}
   */
  getType = () => {
    return this.activeType;
  };

  /**
   * Set active exercise type
   * @param activeType
   */
  setType = (activeType) => {
    this.activeType = activeType;
  };

  /**
   * Set active exercise
   * @param exercise
   */
  setActiveExercise = (exercise) => {
    this.activeExercise = exercise;
  };

  /**
   * Get active exercise
   * @returns {null|*}
   */
  getActiveExercise = () => {
    return this.activeExercise;
  };

  /**
   * Set default type for active exercise
   */
  setDefaultDataType = () => {
    let activeExerciseId = this.getActiveExercise();
    let activeExercise = this.getExercises().filter(exercise => exercise.id === activeExerciseId)[0];
    let dataTypes = activeExercise.dataTypes;
    let defaultDataType = dataTypes[0].id;

    this.setType(defaultDataType);
  };


  /**
   * Data processing
   */

  /**
   * Save new data in database
   * @param data
   */
  saveData = (data) => {
    this.dataSource.post(process.env.REACT_APP_POST_DATA_URL, {data}).then(res => {
      this.hideAddDataDialog();
      this.loadData();
    }).catch((err) => {
      console.error(err);
      this.hideAddDataDialog();
    });
  };



  // TODO timeout, cash in some storage
  /**
   * Get statistics from server
   */
  loadData = () => {
    this.dataSource.get(process.env.REACT_APP_GET_DATA_URL, {}).then(res => {
      let chartData = res.data;
      let dataObj = {};
      let exercises = this.getExercises().map(item => item.id);

      for (let exercise of exercises) {
        dataObj[exercise] = [];
      }

      for (let dataItem of chartData) {
        let dataItemObj = {};
        let {exercise, user, date, values} = dataItem;

        // dataItemObj[date] = {date};
        // dataItemObj[date][user] = {...values};
        dataItemObj[user] = {...values};
        dataItemObj.date = (new Date(date)).getTime();

        dataObj[exercise].push(dataItemObj);
      }

      this.setData(dataObj);
    }).catch((err) => {
      // TODO maybe get from localStorage
    });
  };

  isChartLoaderShown = () => {
    return this.chartLoader;
  };

  isAddDataDialogShown = () => {
    return this.addDataDialogLoader;
  };

  showChartLoader = () => {
    this.chartLoader = true;
  };

  hideChartLoader = () => {
    this.chartLoader = false;
  };

  showAddDataDialogLoader = () => {
    this.addDataDialogLoader = true;
  };

  hideAddDataDialogLoader = () => {
    this.addDataDialogLoader = false;
  };

  onDialogAddDataOpen = () => {
    return this.isAddDataDialogShown;
  };

  showAddDataDialog = () => {
    this.isAddDataDialogShown = true;
  };

  hideAddDataDialog = () => {
    this.isAddDataDialogShown = false;
  };

  showEditUsersDialog = () => {

  };







  // setActiveUsers = (users) => {
  //   this.activeUsers = [...users];
  // };


}

export default ObservableStore;
