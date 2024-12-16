import { clientCredentials } from '../utils/client';
// API CALLS FOR Routine

const endpoint = clientCredentials.databaseURL;

// FIXME:  GET ALL Routines
const getRoutine = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/routine.json?orderBy="uid"&equalTo="${uid}"`, {
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

// FIXME: CREATE SleepRoutine
const createRoutine = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/routine.json`, {
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

// FIXME: GET SINGLE Routine
const getSingleRoutine = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/routine/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// FIXME: DELETE Routine
const deleteRoutine = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/routine/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// FIXME: UPDATE Routine
const updateRoutine = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/routine/${payload.firebaseKey}.json`, {
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

export { getRoutine, createRoutine, getSingleRoutine, deleteRoutine, updateRoutine };
