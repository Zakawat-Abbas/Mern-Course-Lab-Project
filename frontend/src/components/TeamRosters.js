import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import OldTeamRosters from './OldTeamRosters';

function TeamRosters() {
    const [teamName, setTeamName] = useState('');
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);
    const [members, setMembers] = useState([]);

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

    function handleAddMembers(event) {
        event.preventDefault();
        const teamData = {
            teamName: teamName,
            members: members
        };


        console.log(teamData)


        if (teamName && members.length > 0) {
            axios.post('http://localhost:5000/addTeamMember',
                teamData)
                .then((res) => {
                    alert('Members added to the team successfully.');
                })
                .catch((error) => {
                    console.error('Error adding members to the team:', error);
                });
        } else {
            alert('Please select a team and at least one user to add.');
        }
    }

    return (
        <div className="project-container">
            <h2>Create Team Roster</h2>
            <br />
            <div className="form" style={{ width: '450px' }}>

                <label for="team">Select Team</label>
                <br />


                <select
                    id="team"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                >
                    <option value="">Select a Team</option>
                    {teams.map((t) => (
                        <option key={t._id} value={t._id}>
                            {t.teamName}
                        </option>
                    ))}

                </select>
                <br />
                <label for="user">Select Member</label>
                <br />
                <select
                    id="user"
                    multiple
                    value={members}
                    onChange={(e) => setMembers(Array.from(e.target.selectedOptions, (option) => option.value))}

                >
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.firstName + ' ' + user.lastName}
                        </option>
                    ))}
                </select>
                <br />
                <br />

                <button onClick={handleAddMembers}>Add Members</button>
            </div>
        </div>
    );
}

// export default AddTeamMembers;
export default TeamRosters;
