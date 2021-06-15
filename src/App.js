import React, { useState } from 'react';

import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

import './App.css';

function App() {
  const [usersList, setUsersList] = useState([]);

  const addUserHandler = (uName, uAge) => {
    //update the state by appending creating new user and adding usersList
    //when your state update relies on previous state use the function form
    //where you pass a function to setUsersList
    //that function will get the previous latest state update (prevUsersList -- booger)
    setUsersList((prevUsersList) => {
      return [...prevUsersList, { name: uName, age: uAge, id: Math.random().toString() }];
    });
  }

  return (
    <div >
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={usersList} />
    </div>
  );
}

export default App;
