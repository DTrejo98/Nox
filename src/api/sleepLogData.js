import { clientCredentials } from '../utils/client';
// API CALLS FOR SleepLog

const endpoint = clientCredentials.databaseURL;

// FIXME:  GET ALL SleepLog
const getSleepLog = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/sleeplog.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

// FIXME: CREATE SleepLog
const createSleepLog = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/sleeplog.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// FIXME: GET SINGLE SleepLog
const getSingleSleepLog = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/sleeplog/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// FIXME: DELETE SleepLog
const deleteSleepLog = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/sleeplog/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// FIXME: UPDATE SleepLog
const updateSleepLog = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/sleeplog/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// TODO: GET A SINGLE SleepLog'S BOOKS
const getSleepLogQuality = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/quality.json?orderBy="sleeplog_id"&equalTo="${firebaseKey}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// // TODO: FILTER A FAVORITE SleepLog'S BOOKS
// const favoriteSleepLog = (uid) =>
//   new Promise((resolve, reject) => {
//     fetch(`${endpoint}/sleeplog.json?orderBy="uid"&equalTo="${uid}"`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         const favoriteSleepLog = Object.values(data).filter((item) => item.favorite);
//         resolve(favoriteSleepLog);
//       })
//       .catch(reject);
//   });

export { getSleepLog, createSleepLog, getSingleSleepLog, deleteSleepLog, updateSleepLog, getSleepLogQuality };
