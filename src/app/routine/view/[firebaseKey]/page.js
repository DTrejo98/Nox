'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSingleRoutine } from '../../../../api/sleepRoutineData';

export default function ViewRoutine({ params }) {
  const [routineDetails, setRoutineDetails] = useState({});

  // grab firebaseKey from url
  const { firebaseKey } = params;

  // make call to API layer to get the data
  useEffect(() => {
    getSingleRoutine(firebaseKey).then(setRoutineDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <h5>{routineDetails.routine_name}</h5>
        <ul>
          <li>{routineDetails.task1 || ''}</li>
          <li>{routineDetails.task2 || ''}</li>
          <li>{routineDetails.task3 || ''}</li>
          <li>{routineDetails.task4 || ''}</li>
          <li>{routineDetails.task5 || ''}</li>
        </ul>
      </div>
    </div>
  );
}

ViewRoutine.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
