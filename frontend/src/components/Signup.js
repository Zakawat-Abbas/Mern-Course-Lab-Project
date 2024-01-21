import React, { useState } from 'react';
import './style.css'
import logo from './logo.jpg';
import axios from 'axios';
function Signup({ toggleForm }) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }

  function handleUsernameChange(event) {
    setUserName(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }


  function handleSubmit(event) {
    event.preventDefault();
    const signupData = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
    };


    axios.post('http://localhost:5000/createUser', signupData)
      .then((res) => {
        console.log(res)
        alert('Signing Up Succesfully');

        toggleForm('Login');
      })
      .catch((err) => {
        alert('Error in Signing Up');
      });
  }


  return (
    <div className='body'>

      <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
      </div>

      <form action="" method="post" onSubmit={handleSubmit}>
        <img src={logo} alt="Logo" class="logo-img" />
        <h3>Signup Page</h3>

        <label>First Name:</label>
        <input type="text" placeholder="First Name" id="FirstName" value={firstName} onChange={handleFirstNameChange} />

        <label>Last Name:</label>
        <input type="text" placeholder="Last Name" id="LastName" value={lastName} onChange={handleLastNameChange} />

        <label>User ID:</label>
        <input type="text" placeholder="User ID" id="UserName" value={username} onChange={handleUsernameChange} />

        <label>Password:</label>
        <input type="password" placeholder="Password" id="password" value={password} onChange={handlePasswordChange} />
        <br />
        <button type="submit">Submit</button>
        <p>Already have an account? <span onClick={toggleForm}>Login</span></p>
      </form>
    </div>
  );

}

export default Signup;