import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AssignUserStories() {
    const [unassignedUserStories, setUnassignedUserStories] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const usersResponse = await axios.get('http://localhost:5000/getUser');
                console.log(usersResponse.data);
                setUsers(usersResponse.data);

                const unassignedUserStoriesResponse = await axios.get('http://localhost:5000/unassignedUserStories');
                setUnassignedUserStories(unassignedUserStoriesResponse.data);
            } catch (error) {
                console.error('Error fetching users and unassigned user stories:', error);
            }
        }

        fetchData();
    }, []);

    const assignUserStory = (userStoryId, index) => {
        const userId = selectedUsers[index];

        const teamData = {
            userStoryId: userStoryId,
            assignedTo: userId,
        };

        console.log(teamData);

        axios.post('http://localhost:5000/assignUserStories', { teamData })
            .then((res) => {
                if (res.data.success) {
                    alert('User Story Assigned');
                    setSelectedUsers((prevManagers) => {
                        const updatedManagers = [...prevManagers];
                        updatedManagers[index] = '';
                        return updatedManagers;
                    });
                    axios.get('http://localhost:5000/unassignedUserStories')
                        .then((response) => {
                            setUnassignedUserStories(response.data);
                        })
                        .catch((error) => {
                            console.error('Error fetching unassigned user stories:', error);
                        });
                } else {
                    alert('Failed to assign user story');
                }
            })
            .catch((error) => {
                console.error('Error assigning user story:', error);
            });
    };

    return (
        <div>
            <h2>Assign User Stories</h2>
            <table>
                <thead>
                    <tr>
                        <th>User Story</th>
                        <th style={{ textAlign: 'center' }}>User</th>
                        <th>Assign</th>
                    </tr>
                </thead>
                <tbody>
                    {unassignedUserStories.map((userStory, index) => (
                        <tr key={userStory._id}>
                            <td>{userStory.userStory}</td>
                            <td>
                                <select
                                    id="user"
                                    value={selectedUsers[index]}
                                    onChange={(e) => {
                                        const newSelectedUsers = [...selectedUsers];
                                        newSelectedUsers[index] = e.target.value;
                                        setSelectedUsers(newSelectedUsers);
                                    }}
                                >
                                    <option value="">Select User</option>
                                    {users.map((user) => (
                                        <option key={user._id} value={user._id}>
                                            {user.firstName + ' ' + user.lastName}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <button onClick={() => assignUserStory(userStory._id, index)}>Assign</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AssignUserStories;
