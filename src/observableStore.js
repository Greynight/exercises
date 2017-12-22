import {extendObservable, toJS} from 'mobx';
import axios from 'axios';

class ObservableStore {

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
   * Get data by exercise
   */
  getData = () => {
    const activeExercise = this.getActiveExercise();

    return this.data[activeExercise] ? this.data[activeExercise].map(item => toJS(item)) : [];
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
        dataObj[exercise] = {};
      }

      for (let dataItem of chartData) {
        let {exercise, user, date, values} = dataItem;

        dataObj[exercise][date] = dataObj[exercise][date] || {};
        dataObj[exercise][date][user] = {...values};
        dataObj[exercise][date].date = new Date(+date);
        dataObj[exercise][date].dateTime = +date;
      }

      let data = {};

      for (let exercise of exercises) {
        data[exercise] = Object.values(dataObj[exercise]);

        data[exercise].sort((a, b) => {
          return a.dateTime - b.dateTime;
        });
      }

      this.setData(data);
    }).catch((err) => {
      // TODO maybe get from localStorage
    });
  };

  isAddDataDialogShown = () => {
    return this.addDataDialogLoader;
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
}

export default ObservableStore;
