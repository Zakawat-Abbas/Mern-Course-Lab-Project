import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewTasks() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/viewtasks')
            .then((response) => {
                console.log(response.data);
                setTasks(response.data);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    }, []);

    const updateTaskStatus = (taskId, newStatus) => {
        axios.post('http://localhost:5000/updatetask', { taskId, newStatus })
            .then((response) => {
                if (response.data.success) {
                    alert('Task status updated successfully.');
                    axios.get('http://localhost:5000/viewtasks')
                        .then((response) => {
                            console.log(response.data);
                            setTasks(response.data);
                        })
                        .catch((error) => {
                            console.error('Error fetching tasks:', error);
                        });
                } else {
                    alert('Failed to update task status.');
                }
            })
            .catch((error) => {
                console.error('Error updating task status:', error);
                alert('Failed to update task status. Please try again.');
            });
    };

    return (
        <div>
            <h2>View Tasks</h2>
            <table>
                <thead>
                    <tr>
                        <th>Task Description</th>
                        <th>Current Status</th>
                        <th>Update Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task._id}>
                            <td>{task.task}</td>
                            <td>{task.status}</td>
                            <td>
                                <select value={task.status} onChange={(e) => updateTaskStatus(task._id, e.target.value)}>
                                    <option value="New">New</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Awaiting Confirmation">Awaiting Confirmation</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewTasks;
