'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSleepLog } from '../api/sleepLogData';

function SleepLogCard({ sleeplogObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE sleeplog AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteThissleeplog = () => {
    if (window.confirm(`Delete ${sleeplogObj.date} entry?`)) {
      deleteSleepLog(sleeplogObj.firebaseKey).then(() => onUpdate());
    }
  };
  console.log(sleeplogObj);
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{sleeplogObj.date}</Card.Title>

        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
        <Link href={`/sleeplog/edit/${sleeplogObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThissleeplog} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

SleepLogCard.propTypes = {
  sleeplogObj: PropTypes.shape({
    date: PropTypes.string,
    sleepStart: PropTypes.string,
    sleepEnd: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default SleepLogCard;
