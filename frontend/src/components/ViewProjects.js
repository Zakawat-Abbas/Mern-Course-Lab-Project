import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewProjects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function fetchProjects() {
            try {
                axios.get('http://localhost:5000/getProjects')
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
    }, []);

    return (
        <div >
            <h2 className='project-container'>View Projects</h2>
            <table>
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Project Description</th>
                        <th>Product Owner</th>
                        <th>Project Manager</th>
                        <th>Team</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project._id}>
                            <td>{project.projectName}</td>
                            <td>{project.projectDescription}</td>
                            <td>{project.productOwner.firstName} {project.productOwner.lastName}</td>
                            <td>{project.manager.firstName} {project.manager.lastName}</td>
                            <td>{project.team.teamName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewProjects;



