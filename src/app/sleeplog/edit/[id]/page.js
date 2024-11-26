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
  console.log(params);
  return <SleepLogForm obj={editItem} />;
}

EditSleepLog.propTypes = {
  params: PropTypes.objectOf.isRequired,
};
