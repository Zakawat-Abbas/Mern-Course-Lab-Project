import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RemoveTeamMembers() {
    const [selectedMember, setSelectedMember] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [teamsData, setTeamsData] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');


    useEffect(() => {
        axios.get('http://localhost:5000/getTeamMember')

            .then((res) => {
                console.log(res.data)
                setTeamsData(res.data);
            })
            .catch((error) => {
                console.error('Error fetching teams:', error);
            });
    }, []);


    useEffect(() => {
        if (selectedTeam) {
            const selectedTeamData = teamsData.find(team => team._id === selectedTeam);

            if (selectedTeamData) {
                setTeamMembers(selectedTeamData.members);
            } else {
                setTeamMembers([]);
            }
        } else {
            setTeamMembers([]);
        }
    }, [selectedTeam, teamsData]);

    function handleRemoveMembers(event) {
        event.preventDefault();
        const teamData = {
            teamName: selectedTeam,
            members: selectedMember
        };


        console.log(teamData)
        if (selectedTeam && selectedMember.length > 0) {
            axios.post('http://localhost:5000/removeTeamMember', teamData)
                .then((response) => {
                    alert('Members removed from the team successfully.');
                    axios.get(`http://localhost:5000/getTeamMember`)
                        .then((res) => {
                            if (res) {
                                setTeamsData(res.data);
                            } else {
                                console.error('Failed to fetch team members.');
                            }
                        })
                        .catch((error) => {
                            console.error('Error fetching team members:', error);
                        });
                })
                .catch((error) => {
                    console.error('Error removing members from the team:', error);
                });
        } else {
            alert('Please select a team and at least one member to remove.');
        }
    };

    return (
        <div className="project-container">
            <h2>Remove Team Member</h2>
            <br />
            <div className="form" style={{ width: '450px' }}>

                <label for="team">Select Team</label>
                <br />
                <select
                    id="team"
                    value={selectedTeam}
                    onChange={(e) => setSelectedTeam(e.target.value)}>
                    <option value="">Select a Team</option>
                    {teamsData.map((team) => (
                        <option key={team._id} value={team._id}>
                            {team.teamName.teamName}
                        </option>
                    ))}
                </select>
                <br />
                <label for="user">Select Member</label>
                <br />
                <select
                    id="user"
                    multiple
                    value={selectedMember}
                    onChange={(e) => setSelectedMember(Array.from(e.target.selectedOptions, (option) => option.value))}

                >
                    {teamMembers.map((member) => (
                        <option key={member._id} value={member._id}>
                            {`${member.firstName} ${member.lastName}`}
                        </option>
                    ))}
                </select>
                <br />
                <br />


                <button onClick={handleRemoveMembers}>Remove Members</button>
            </div>
        </div>
    );
}

export default RemoveTeamMembers;
