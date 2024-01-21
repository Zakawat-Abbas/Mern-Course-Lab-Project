import React, { useState } from 'react';
import './ProjectStyle.css';
import axios from 'axios';

function Team() {
  const [teamName, setTeamName] = useState('');

  function handleTeamNameChange(event) {
    setTeamName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const teamData = {
      teamName: teamName
    };


    axios.post('http://localhost:5000/createTeams', teamData)
      .then((res) => {
        console.log(res.data)
        alert('Team Created Succesfully');
      })
      .catch((err) => {
        alert('Error in Team Creation');
      });
  }

  return (
    <div className="project-container">

      <h2>Create Project Team</h2>

      <form onSubmit={handleSubmit}>

        <label htmlFor="Name">Team Name:</label>
        <input
          type="text"
          id="Name"
          value={teamName}
          onChange={handleTeamNameChange}
        />
        <br />
        <button type="submit">Create Team</button>
      </form>
    </div>
  );
}

export default Team;
