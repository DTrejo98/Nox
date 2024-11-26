'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { getSleepLog } from '../../api/sleepLogData';
import SleepLogCard from '../../components/SleepLogCard';

function AuthorPage() {
  // TODO: Set a state for books
  const [sleepLog, setSleepLog] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the books
  const getAllSleepLog = () => {
    getSleepLog(user.uid).then(setSleepLog);
  };
  console.log(user.uid);
  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
    getAllSleepLog();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/sleeplog/new" passHref>
        <Button>Add An Author</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {sleepLog.map((sleeplog) => (
          <SleepLogCard key={sleeplog.firebaseKey} sleeplogObj={sleeplog} onUpdate={getAllSleepLog} />
        ))}
      </div>
    </div>
  );
}

export default AuthorPage;
