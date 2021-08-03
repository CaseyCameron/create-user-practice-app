import React, { useState, useRef } from 'react';

import Button from '../UI/Button';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import Wrapper from '../Helpers/Wrapper';

import classes from './AddUser.module.css';

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    //if either input field is empty, exit the function
    if (enteredName.trim().length === 0 || enteredUserAge.trimEnd().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age.'
      });
      return;
    }
    if (+enteredUserAge < 1) { //this forces enteredAge, a string, to compare here as a number
      setError({
        title: 'Invalid age',
        message: 'Please enter an age over 0.'
      });
      return;
    }
    props.onAddUser(enteredName, enteredUserAge); //from our parent -- see <AddUser> component
    nameInputRef.current.value='';
    ageInputRef.current.value='';
  };

  const errorHandler = () => {
    setError(null); //set setError to a falsey value to dismiss the error msg
  };

  return (
    <Wrapper>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            ref={nameInputRef}
          />
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  )
};

export default AddUser;
