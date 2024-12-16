'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RoutineForm from '@/components/forms/RoutineForm';
import { getSingleRoutine } from '../../../../api/sleepRoutineData';

export default function EditRoutine({ params }) {
  const [editItem, setEditItem] = useState({});
  const { firebaseKey } = params;

  useEffect(() => {
    getSingleRoutine(firebaseKey).then(setEditItem);
  }, [firebaseKey]);
  return <RoutineForm obj={editItem} />;
}

EditRoutine.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired, // Expect firebaseKey as a string
  }).isRequired,
};
