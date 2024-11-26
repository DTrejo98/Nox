/* eslint-disable react/no-unused-prop-types */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createSleepLog, updateSleepLog } from '../../api/sleepLogData';

const initialState = {
  date: '',
  sleepStart: '',
  sleepEnd: '',
  quality: '',
  firebaseKey: '',
};

function SleepLogForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput(obj); // Ensure obj has the necessary data
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      console.log('Updating sleeplog with data:', formInput);
      updateSleepLog(formInput).then(() => router.push(`/sleeplog/`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createSleepLog(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateSleepLog(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Sleep Log Entry</h2>

      {/* FIRST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Date" className="mb-3">
        <Form.Control type="text" placeholder="Enter date" name="date" value={formInput.date} onChange={handleChange} required />
      </FloatingLabel>

      {/* FIRST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Sleep Start Time" className="mb-3">
        <Form.Control type="text" placeholder="Enter sleep start time" name="sleepStart" value={formInput.sleepStart} onChange={handleChange} required />
      </FloatingLabel>

      {/* LAST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Sleep End Time" className="mb-3">
        <Form.Control type="text" placeholder="Enter sleep end time" name="sleepEnd" value={formInput.sleepEnd} onChange={handleChange} required />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Sleep Log Entry</Button>
    </Form>
  );
}

SleepLogForm.propTypes = {
  obj: PropTypes.shape({
    date: PropTypes.string,
    sleepStart: PropTypes.string,
    sleepEnd: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    quality: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default SleepLogForm;
