import {extendObservable} from 'mobx';
import axios from 'axios';

class ObservableStore {

  // TODO generate ListItem dynamically from some config
  // TODO show which ListItem was chosen
  // TODO generate togglers dynamically
  // TODO loader on load/save data

  constructor() {
    extendObservable(this, {
      data: [],
      type: null,
      users: [],
      activeUsers: {},
      exercises: [],
      activeExercise: null,
      isAddDataDialogShown: false,
      chartLoader: false,
      addDataDialogLoader: false
    });

    this.dataSource = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL
    });
  }

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

  saveData = (data) => {
    this.dataSource.post(process.env.REACT_APP_POST_DATA_URL, {data}).then(res => {
      this.hideAddDataDialog();
      this.loadData();
    }).catch((err) => {
      console.error(err);
      this.hideAddDataDialog();
    });
  };

  setData = (data) => {
    this.data = [...data];
  };

  getData = () => {
    return this.data.map(item => item);
  };

  // TODO timeout, cash in some storage
  loadData = () => {
    this.dataSource.get(process.env.REACT_APP_GET_DATA_URL, {}).then(res => {
      let chartData = res.data.map(item => item.data);
      let dataObj = {};
      let data = [];

      for (let dataItem of chartData) {
        if (!dataObj[dataItem.date]) {
          dataObj[dataItem.date] = {};
        }

        dataObj[dataItem.date].date = dataItem.date;
        dataObj[dataItem.date][`${dataItem.user}.calories`] = dataItem.calories;
        dataObj[dataItem.date][`${dataItem.user}.time`] = dataItem.time;
        dataObj[dataItem.date][`${dataItem.user}.distance`] = dataItem.distance;
      }

      let days = Object.keys(dataObj);

      for (let day of days) {
        data.push(dataObj[day]);
      }

      this.setData(data);
    }).catch((err) => {
      // maybe get from localStorage
    });
  };

  getUsers = () => {
    return this.users.map(user => user);
  };

  setUsers = (users) => {
    this.users = [...users];
  };

  // setActiveUsers = (users) => {
  //   this.activeUsers = [...users];
  // };

  setDefaultActiveUsers = (users) => {
    let activeUsers = {};
    let usersIds = users.map(user => user.id);

    for (let userId of usersIds) {
      activeUsers[userId] = true;
    }

    this.activeUsers = {...activeUsers};
  };

  setExercises = (exercises) => {
    this.exercises = [...exercises];
  };

  getExercises = () => {
    return this.exercises;
  };

  getType = () => {
    return this.type;
  };

  setType = (type) => {
    this.type = type;
  };

  setActiveExercise = (exercise) => {
    this.activeExercise = exercise;
  };

  getActiveExercise = () => {
    return this.activeExercise;
  };

  setDefaultDataType = () => {
    let activeExerciseId = this.getActiveExercise();
    let activeExercise = this.getExercises().filter(exercise => exercise.id === activeExerciseId)[0];
    let dataTypes = activeExercise.dataTypes;
    let defaultDataType = dataTypes[0].id;

    this.setType(defaultDataType);
  };

}

export default ObservableStore;
