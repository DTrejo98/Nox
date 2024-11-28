import { clientCredentials } from '../utils/client';
// API CALLS FOR SleepLog

const endpoint = clientCredentials.databaseURL;

// FIXME:  GET ALL SleepLog
const getQuality = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/quality.json`, {
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

export default getQuality;
