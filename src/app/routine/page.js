'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { getRoutine } from '../../api/sleepRoutineData';
import RoutineCard from '../../components/Cards/RoutineCard';

function RoutinePage() {
  const [routines, setRoutines] = useState([]);
  const { user } = useAuth();

  // Fetch sleep log and quality data
  const getAllRoutines = () => {
    getRoutine(user.uid).then(setRoutines);
  };

  useEffect(() => {
    getAllRoutines();
  }, []);

  console.log(getRoutine(user.uid));

  return (
    <div className="text-center my-4">
      <Link href="/routine/new" passHref>
        <Button>Add Sleep Log Entry</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {routines.map((routine) => (
          <RoutineCard key={routine.firebaseKey} routineObj={routine} onUpdate={getAllRoutines} />
        ))}
      </div>
    </div>
  );
}

export default RoutinePage;
