// example data
// "[{\"data\":{\"number\":[12,13]},\"date\":1514901897930,\"user\":\"ivan\",\"exercise\":\"pushups\"},{\"data\":{\"number\":[8,9]},\"date\":1512684000000,\"user\":\"ivan\",\"exercise\":\"pushups\"},{\"data\":{\"number\":[7,9]},\"date\":\"2017-12-27T22:00:00.000Z\",\"user\":\"ivan\",\"exercise\":\"pushups\"}]"

import users from './users';
import exercises from './exercises';
import params from './params';

import {
  mLabLoadData,
  mLabSaveData,
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

  // any custom dataLoader can be used here
  static async loadData() {
    return mLabLoadData();
  }

  // any custom dataLoader can be used here
  static async saveData(data) {
    return mLabSaveData(data);
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
