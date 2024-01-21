import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useLocation } from 'react-router-dom';

function UserProjects() {
    const [projects, setProjects] = useState([]);
    const location = useLocation();
    const [userStories, setUserStories] = useState([]);
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');

    useEffect(() => {
        async function fetchProjects() {
            try {
                axios.get(`http://localhost:5000/userProjects/${userId}`)
                    .then((res) => {
                        console.log(res.data)
                        setProjects(res.data);
                    }).catch((err) => {
                        alert('Failed to fetch projects.');
                        console.error('Failed to fetch projects.', err);
                    });
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        }

        fetchProjects();
    }, [userId]);
    const handleViewUserStory = (projectId) => {
        axios.get(`http://localhost:5000/getUserStory/${projectId}`)

            .then((res) => {
                console.log(res.data);
                setUserStories(res.data.userStories);

            })
            .catch((error) => {
                console.error('Error fetching user stories:', error);
            });
    };

    return (
        <div>
            <h2 className='project-container'>View Projects</h2>
            <table>
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Project Owner</th>
                        <th>View User Story</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project._id}>
                            <td>{project.projectName}</td>
                            <td>{project.productOwner.firstName} {project.productOwner.lastName}</td>
                            <td>
                                <button onClick={() => handleViewUserStory(project._id)}>View User Story</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2 className='project-container' style={{ marginTop: '40px' }}>User Story</h2>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Project</th>
                        <th>Priority</th>
                    </tr>
                </thead>
                <tbody>
                    {userStories.map((story) => (
                        <tr key={story._id}>
                            <td>{story.userStory}</td>
                            <td>{story.projects.projectName}</td>
                            <td>{story.priority}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserProjects;
