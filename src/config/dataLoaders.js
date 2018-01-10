import axios from 'axios';

const exampleData = "[{\"data\":{\"number\":[12,13]},\"date\":1514901897930,\"user\":\"test1\",\"exercise\":\"pushups\"},{\"data\":{\"number\":[8,9]},\"date\":1512684000000,\"user\":\"test1\",\"exercise\":\"pushups\"},{\"data\":{\"number\":[7,9]},\"date\":\"2017-12-27T22:00:00.000Z\",\"user\":\"test1\",\"exercise\":\"pushups\"}]";

// Local storage
const localStorageLoadData = () => {
  if (!localStorage.applicationData) {
    localStorage.applicationData = exampleData;
  }

  return JSON.parse(localStorage.applicationData);
};

const localStorageSaveData = (data) => {
  let existingData = JSON.parse(localStorage.applicationData);
  existingData.push(data);
  localStorage.applicationData = JSON.stringify(existingData);

  return data;
};

// mLab
async function mLabLoadData() {
  const dataSource = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
  });

  const result = await dataSource.get(process.env.REACT_APP_GET_DATA_URL, {});

  return result.data;
}

async function mLabSaveData(data) {
  const dataSource = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
  });

  return await dataSource.post(process.env.REACT_APP_POST_DATA_URL, data);
}

export {
  localStorageLoadData,
  localStorageSaveData,
  mLabLoadData,
  mLabSaveData
}
