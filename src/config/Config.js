import users from './users';
import exercises from './exercises';
import params from './params';

import {
  localStorageLoadData,
  localStorageSaveData
} from './dataLoaders';

const configData = {
  users,
  exercises,
  params
};

class Config {
  constructor() {
    this.data = configData;
    this.validateData();
  }

  static async loadData() {
    // can be replaced by any custom dataLoader
    return localStorageLoadData();
  }

  static async saveData(data) {
    // can be replaced by any custom dataLoader
    return localStorageSaveData(data);
  }

  getDefaultExerciseId() {
    return this.getExercises()[0].id;
  };

  getDefaultParamId() {
    return this.getDefaultParams()[0];
  }

  getExercises() {
    return this.data.exercises;
  }

  getUsers() {
    return this.data.users;
  }

  getParams() {
    return this.data.params;
  }

  getDefaultParams() {
    return this.getExercises()[0].params;
  }

  isUserCorrect(element) {
    return (
      typeof element === 'object' &&
      element.hasOwnProperty('id') && element.id &&
      element.hasOwnProperty('name') && element.name &&
      element.hasOwnProperty('color') && element.color &&
      element.hasOwnProperty('isActive')
    );
  }

  isExerciseCorrect = (element) => {
    return (
      typeof element === 'object' &&
      element.hasOwnProperty('id') && element.id &&
      element.hasOwnProperty('name') && element.name &&
      element.hasOwnProperty('params') && Array.isArray(element.params) &&
      element.params.length &&
      element.hasOwnProperty('results') && Array.isArray(element.results) &&
      element.results.length
    );
  };

  isDataItemCorrect = (element) => {
    return (
      typeof element === 'object' &&
      element.hasOwnProperty('date') && (new Date(element.date)).toString() !== "Invalid Date" &&
      element.hasOwnProperty('exercise') && element.hasOwnProperty('user') &&
      element.hasOwnProperty('data') && typeof element.data === 'object' &&
      this.data.exercises.find(item => item.id === element.exercise) &&
      this.data.exercises.find(item => item.id === element.exercise).results.includes(Object.keys(element.data)[0])
    );
  };

  validateData() {
    const data = this.data;
    let errorText = '';

    if (typeof data !== 'object') {
      errorText += '\nConfig must be an object';
    }

    // Validate users
    if (!data.hasOwnProperty('users') || !Array.isArray(data.users) || data.users.length === 0) {
      errorText += '\nConfig object must have property "users" and it must be not empty array';
    }

    if (!data.users.every(this.isUserCorrect)) {
      errorText += '\nPlease check structure of "user" objects';
    }

    // Validate exercises
    if (!data.hasOwnProperty('exercises') || !Array.isArray(data.exercises) || data.exercises.length === 0) {
      errorText += '\nConfig object must have property "exercises" and it must be not empty array';
    }

    if (!data.exercises.every(this.isExerciseCorrect)) {
      errorText += '\nPlease check structure of "exercise" objects';
    }

    if (errorText) {
      throw new Error(errorText);
    }
  }
}

export default Config;
