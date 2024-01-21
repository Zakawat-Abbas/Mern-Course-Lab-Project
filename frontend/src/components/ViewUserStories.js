import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewUserStories() {
    const [selectedProject, setSelectedProject] = useState('');
    const [userStories, setUserStories] = useState([]);
    const [projects, setProjects] = useState([]);

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

    useEffect(() => {
        if (selectedProject) {
            console.log(selectedProject)
            axios.get(`http://localhost:5000/getUserStory/${selectedProject}`)

                .then((res) => {
                    console.log(res.data);
                    setUserStories(res.data.userStories);

                })
                .catch((error) => {
                    console.error('Error fetching user stories:', error);
                });
        }
    }, [selectedProject]);

    const handleDeleteStory = (storyId) => {
        console.log(storyId)
        axios.delete(`http://localhost:5000/removeUserStory/${storyId}`)
            .then((res) => {
                console.log(res.data)
                alert('User story deleted successfully.');
                axios
                    .get(`http://localhost:5000/getUserStory/${selectedProject}`)
                    .then((res) => {
                        setUserStories(res.data.userStories);

                    })
                    .catch((error) => {
                        console.error('Error fetching user stories:', error);
                    });

            })
            .catch((error) => {
                console.error('Error deleting user story:', error);
            });
    };

    return (
        <div className="project-container">
            <h2>View User Stories</h2>
            <div className="form" style={{ textAlign: 'center' }}>

                <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)} style={{ textAlign: 'center' }}>
                    <option value="">Select a Project</option>
                    {projects.map((project) => (
                        <option key={project._id} value={project._id}>
                            {project.projectName}
                        </option>
                    ))}
                </select>


                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Project</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userStories.map((story) => (
                            <tr key={story._id}>
                                <td>{story.userStory}</td>
                                <td>{story.projects.projectName}</td>
                                <td>{story.priority}</td>
                                <td>
                                    <button style={{ marginTop: '0' }} onClick={() => handleDeleteStory(story._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewUserStories;


