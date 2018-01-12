import axios from 'axios';

// Local storage
const localStorageLoadData = () => {
  return JSON.parse(localStorage.applicationData);
};

const localStorageSaveData = (data) => {
  let existingData = JSON.parse(localStorage.applicationData);
  existingData.push(data);
  localStorage.applicationData = JSON.stringify(existingData);

  return data;
};

// mLab
/**
 * .env file must be created with such variables as
 *    REACT_APP_BASE_URL - for example "https://api.mlab.com/api/1"
 *    REACT_APP_GET_DATA_URL - for example "/databases/your_database_name/collections/your_table_name?apiKey=your_api_key"
 *    REACT_APP_POST_DATA_URL - the same as REACT_APP_GET_DATA_URL usually
 */
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
