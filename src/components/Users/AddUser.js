import React, { useState } from 'react';

import Button from '../UI/Button';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import Wrapper from '../Helpers/Wrapper';

import classes from './AddUser.module.css';

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    //if either input field is empty, exit the function
    if (enteredUsername.trim().length === 0 || enteredAge.trimEnd().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age.'
      });
      return;
    }
    if (+enteredAge < 1) { //this forces enteredAge, a string, to compare here as a number
      setError({
        title: 'Invalid age',
        message: 'Please enter an age over 0.'
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge); //from our parent -- see <AddUser> component
    setEnteredUsername('');
    setEnteredAge('');
  };

  const usernameChangeHandler = event => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = event => {
    setEnteredAge(event.target.value);
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
          <input id="username" type="text" value={enteredUsername} onChange={usernameChangeHandler} />
          <label htmlFor="age">Age</label>
          <input id="age" type="number" value={enteredAge} onChange={ageChangeHandler} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  )
};

export default AddUser;