import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './ProjectStyle.css';

function UserStory() {
  const [userStory, setUserStory] = useState('');
  const [projects, setProjects] = useState([]);
  const [priority, setPriority] = useState('0');
  const [selectedProject, setselectedProject] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/getProjects')
      .then((res) => {
        console.log(res.data)
        setProjects(res.data);

      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  }, []);


  function handleSubmit(event) {
    event.preventDefault();
    const userStoryData = {
      userStory: userStory,
      projects: selectedProject,
      priority: priority
    };

    axios.post('http://localhost:5000/createUserStory',
      userStoryData)
      .then((res) => {
        console.log(res.data)
        alert('User Story created successfully.');
        setUserStory('')
        setselectedProject('')
        setPriority('0')

      })
      .catch((err) => {
        alert('Failed to create User Story.');
        console.error('Error creating User Story:', err);
      });
  }

  return (
    <div className="project-container">

      <h2>Create a User Story</h2>

      <form onSubmit={handleSubmit}>

        <label htmlFor="userStory">User Story:</label>

        <textarea
          id="userStory"
          value={userStory}
          onChange={(e) => setUserStory(e.target.value)}
        ></textarea>

        <label htmlFor="project">Project:</label>
        <select
          id="project"
          value={selectedProject}
          onChange={(e) => setselectedProject(e.target.value)}
        >
          <option value="">Select Project</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.projectName}
            </option>
          ))}
        </select>

        <label htmlFor="priority">Priority:</label>
        <input
          type="number"
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
        <br />
        <button type="submit">Create User Story</button>
      </form>
    </div>
  );
}

export default UserStory;
