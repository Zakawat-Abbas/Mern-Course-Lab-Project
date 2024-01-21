import React, { useState, useEffect } from 'react';
import './ProjectStyle.css';
import axios from 'axios';

function Project() {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [productOwner, setProductOwner] = useState('');
  const [manager, setManager] = useState('');
  const [team, setTeam] = useState('');

  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function fetchUsersAndTeams() {
      try {
        axios.get('http://localhost:5000/getUser')
          .then((res) => {
            console.log(res.data)
            setUsers(res.data);
          }).catch((err) => {
            alert('Failed to fetch users');
            console.error('Failed to fetch users.', err);
          });
        axios.get('http://localhost:5000/getTeams')
          .then((res) => {
            console.log(res.data)
            setTeams(res.data);
          }).catch((err) => {
            alert('Error fetching teams');
            console.error('Error fetching teams:', err);
          });

      } catch (error) {
        console.error('Error fetching users and teams:', error);
      }
    }

    fetchUsersAndTeams();
  }, []);


  function handleSubmit(event) {
    event.preventDefault();
    const projectData = {
      projectName: projectName,
      projectDescription: projectDescription,
      productOwner: productOwner,
      manager: manager,
      team: team,
    };

    axios.post('http://localhost:5000/createProjects',
      projectData)
      .then((res) => {
        console.log(res.data)
        // alert('Project created successfully.');
        window.location.href = '/viewprojects';
        setProjectName('');
        setProjectDescription('');
        setProductOwner('');
        setManager('');
        setTeam('');

      })
      .catch((err) => {
        alert('Failed to create project.');
        console.error('Error creating project:', err);
      });
  }


  return (
    <div className="project-container">

      <h2>Create a New Project</h2>

      <form onSubmit={handleSubmit}>

        <label htmlFor="projectName">Project Name:</label>
        <br />

        <input
          type="text"
          id="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <label htmlFor="projectDescription">Project Description:</label>
        <textarea
          id="projectDescription"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        ></textarea>

        <label htmlFor="productOwner">Product Owner:</label>

        <select
          id="productOwner"
          value={productOwner}
          onChange={(e) => setProductOwner(e.target.value)}
        >
          <option value="">Select Product Owner</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.firstName + ' ' + user.lastName}
            </option>
          ))}

        </select>

        <label htmlFor="mgr">Manager:</label>
        <select
          id="mgr"
          value={manager}
          onChange={(e) => setManager(e.target.value)}
        >
          <option value="">Select Manager</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.firstName + ' ' + user.lastName}
            </option>
          ))}
        </select>

        <label htmlFor="team">Team:</label>

        <select
          id="team"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        >
          <option value="">Select Team</option>
          {teams.map((t) => (
            <option key={t._id} value={t._id}>
              {t.teamName}
            </option>
          ))}

        </select>
        <br />
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}

export default Project;




