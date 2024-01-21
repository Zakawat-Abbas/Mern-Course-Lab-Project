// AssignUserStories.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AssignUserStories() {
    const [unassignedUserStories, setUnassignedUserStories] = useState([]);

    useEffect(() => {
        // Fetch unassigned user stories from the server
        axios.get('/unassignedUserStories')
            .then((response) => {
                setUnassignedUserStories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching unassigned user stories:', error);
            });
    }, []);

    // ... Assign and rendering logic for user stories ...

    return (
        <div>
            <h2>Assign User Stories</h2>
            <table>
                <thead>
                    <tr>
                        <th>User Story</th>
                        <th>Assign</th>
                    </tr>
                </thead>
                <tbody>
                    {unassignedUserStories.map((userStory) => (
                        <tr key={userStory._id}>
                            <td>{userStory.title}</td>
                            <td>
                                {/* Render "Assign" button */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AssignUserStories;
