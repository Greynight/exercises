import {extendObservable} from 'mobx';
import axios from 'axios';

const defaultType = 'calories';
const usersList = [{id: 'ivan', name: 'Ivan'}, {id: 'marina', name: 'Marina'}];
const typesList = ['calories', 'time', 'distance'];

class ObservableStore {

  // TODO generate ListItem dynamically from some config
  // TODO show which ListItem was chosen
  // TODO generate togglers dynamically
  // TODO loader on load/save data

  constructor() {
    extendObservable(this, {
      data: [],
      type: defaultType,
      users: {
        ivan: true,
        marina: true
      },
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

  getUsersList = () => {
    return usersList.map(item => item);
  };

  getTypesList = () => {
    return typesList;
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
    return this.users;
  };

  setUsers = (users) => {
    this.users = {...users};
  };

  getType = () => {
    return this.type;
  };

  setType = (type) => {
    this.type = type;
  }

}

export default ObservableStore;
