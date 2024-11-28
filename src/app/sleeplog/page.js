'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { getSleepLog } from '../../api/sleepLogData';
import SleepLogCard from '../../components/SleepLogCard';
import getQuality from '../../api/sleepQualityData';

function AuthorPage() {
  const [sleepLog, setSleepLog] = useState([]);
  const [quality, setQuality] = useState([]);
  const { user } = useAuth();

  // Fetch sleep log and quality data
  const getAllSleepLog = () => {
    getSleepLog(user.uid).then(setSleepLog);
    getQuality().then(setQuality);
  };

  useEffect(() => {
    getAllSleepLog();
  }, []); // Empty array ensures this runs once when the component mounts

  // Combine both sleep log and quality data if needed
  const combineData = () => {
    const combined = [];

    sleepLog.forEach((sleepEntry) => {
      const associatedQuality = quality.find((qualityEntry) => qualityEntry.firebaseKey === sleepEntry.qualityId);
      const qualityEntry = associatedQuality || {};

      combined.push({
        ...sleepEntry,
        quality: qualityEntry,
      });
    });

    return combined;
  };

  return (
    <div className="text-center my-4">
      <Link href="/sleeplog/new" passHref>
        <Button>Add Sleep Log Entry</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {combineData().map((entry) => (
          <SleepLogCard key={entry.firebaseKey} sleeplogObj={entry} qualityObj={entry.quality} onUpdate={getAllSleepLog} />
        ))}
      </div>
    </div>
  );
}

export default AuthorPage;
