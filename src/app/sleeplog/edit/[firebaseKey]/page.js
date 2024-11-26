'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSingleSleepLog } from '@/api/sleepLogData';
import SleepLogForm from '@/components/forms/SleepLogForm';

export default function EditSleepLog({ params }) {
  const [editItem, setEditItem] = useState({});
  const { firebaseKey } = params;

  useEffect(() => {
    getSingleSleepLog(firebaseKey).then(setEditItem);
  }, [firebaseKey]);
  return <SleepLogForm obj={editItem} />;
}

EditSleepLog.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired, // Expect firebaseKey as a string
  }).isRequired,
};
