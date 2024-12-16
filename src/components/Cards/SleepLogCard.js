'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSleepLog } from '../../api/sleepLogData';

function SleepLogCard({ sleeplogObj, qualityObj, onUpdate }) {
  const deleteThissleeplog = () => {
    if (window.confirm(`Delete ${sleeplogObj.date} entry?`)) {
      deleteSleepLog(sleeplogObj.firebaseKey).then(() => onUpdate());
    }
  };

  console.log(qualityObj);

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{sleeplogObj.date}</Card.Title>
        <p className="card-text bold">
          {sleeplogObj.sleepStart} - {sleeplogObj.sleepEnd}
        </p>
        <p className="card-text bold">{qualityObj.type}</p>

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
    qualityId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  qualityObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default SleepLogCard;
