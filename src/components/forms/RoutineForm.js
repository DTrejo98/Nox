/* eslint-disable no-shadow */
/* eslint-disable react/no-unused-prop-types */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createRoutine, updateRoutine } from '../../api/sleepRoutineData';

const initialState = {
  routine_name: '',
  task1: '',
  task2: '',
  task3: '',
  task4: '',
  task5: '',
  firebaseKey: '',
};

function RoutineForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const router = useRouter();
  const { user } = useAuth();

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
      updateRoutine(formInput).then(() => router.push(`/routine/`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createRoutine(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateRoutine(patchPayload).then(() => {
          router.push('/routine/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Sleep Log Entry</h2>

      {/* FIRST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Routine Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter Routine Name" name="routine_name" value={formInput.routine_name || ''} onChange={handleChange} required />
      </FloatingLabel>

      {/* FIRST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Task 1" className="mb-3">
        <Form.Control type="text" placeholder="Enter First Task" name="task1" value={formInput.task1 || ''} onChange={handleChange} required />
      </FloatingLabel>

      {/* FIRST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Task 2" className="mb-3">
        <Form.Control type="text" placeholder="Enter Second Task" name="task2" value={formInput.task2 || ''} onChange={handleChange} required />
      </FloatingLabel>

      {/* FIRST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Task 3" className="mb-3">
        <Form.Control type="text" placeholder="Enter Third Task" name="task3" value={formInput.task3 || ''} onChange={handleChange} required />
      </FloatingLabel>

      {/* FIRST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Task 4" className="mb-3">
        <Form.Control type="text" placeholder="Enter Fourth Task" name="task4" value={formInput.task4 || ''} onChange={handleChange} required />
      </FloatingLabel>

      {/* FIRST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Task 5" className="mb-3">
        <Form.Control type="text" placeholder="Enter Fifth Task" name="task5" value={formInput.task5 || ''} onChange={handleChange} required />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Sleep Log Entry</Button>
    </Form>
  );
}

RoutineForm.propTypes = {
  obj: PropTypes.shape({
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

export default RoutineForm;
