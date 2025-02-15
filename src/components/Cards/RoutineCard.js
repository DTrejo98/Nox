'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteRoutine } from '../../api/sleepRoutineData';

function RoutineCard({ routineObj, onUpdate }) {
  const deleteThisRoutine = () => {
    if (window.confirm(`Delete ${routineObj.routine_name} entry?`)) {
      deleteRoutine(routineObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{routineObj.routine_name}</Card.Title>

        {/* DYNAMIC LINK TO EDIT THE ROUTINE DETAILS  */}
        <Link href={`/routine/edit/${routineObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Link href={`/routine/view/${routineObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">
            VIEW
          </Button>
        </Link>
        <Button variant="danger" onClick={deleteThisRoutine} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

RoutineCard.propTypes = {
  routineObj: PropTypes.shape({
    routine_name: PropTypes.string,
    task1: PropTypes.string,
    task2: PropTypes.string,
    task3: PropTypes.string,
    task4: PropTypes.string,
    task5: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default RoutineCard;
