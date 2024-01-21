import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProjectStyle.css';

function Task() {
  const [task, setTask] = useState('');
  const [selectedUserStory, setSelectedUserStory] = useState('');
  const [assignedUserStories, setassignedUserStories] = useState([]);
  const [createdBy, setCreatedBy] = useState('');
  const [status, setStatus] = useState('New');
  const [users, setUsers] = useState([]);

  const statusOptions = ['New', 'In Progress', 'Awaiting Confirmation', 'Completed'];

  useEffect(() => {
    async function fetchData() {
      try {
        const usersResponse = await axios.get('http://localhost:5000/getUser');
        console.log(usersResponse.data);
        setUsers(usersResponse.data);

        const assignedUserStoriesResponse = await axios.get('http://localhost:5000/assignedUserStories');
        console.log(assignedUserStoriesResponse.data)
        setassignedUserStories(assignedUserStoriesResponse.data);
      } catch (error) {
        console.error('Error Assigned user stories:', error);
      }
    }

    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const taskData = {
      task: task,
      userStory: selectedUserStory,
      createdBy: createdBy,
      status: status,
    };

    console.log(taskData)

    axios.post('http://localhost:5000/createtask',
      taskData)
      .then((res) => {
        console.log(res.data)
        alert('Task created successfully.');
        window.location.href = '/viewtasks';
        setTask('');
        setSelectedUserStory('');
        setCreatedBy('');
        setStatus('New');

      })
      .catch((err) => {
        alert('Failed to create task.');
        console.error('Error creating task:', err);
      });

  };

  return (
    <div className="project-container">


      <h2>Create a Task</h2>


      <form onSubmit={handleSubmit}>


        <label htmlFor="task">Task:</label>


        <textarea
          id="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        ></textarea>

        <label htmlFor="userStory">User Story:</label>
        <select
          id="userStory"
          value={selectedUserStory}
          onChange={(e) => setSelectedUserStory(e.target.value)}
        >
          <option value="">Select User Story</option>
          {assignedUserStories.map((userStory) => (
            <option key={userStory._id} value={userStory._id}>
              {userStory.userStory.userStory}

            </option>
          ))}


        </select>

        <label htmlFor="createdBy">Created by:</label>

        <select
          id="createdBy"
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
        >
          <option value="">Select Created by</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>

              {user.firstName + ' ' + user.lastName}
            </option>
          ))}

        </select>

        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}

export default Task;
