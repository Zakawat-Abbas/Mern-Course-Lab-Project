import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewTeams() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        async function fetchTeams() {
            try {
                axios.get('http://localhost:5000/getTeams')
                    .then((res) => {
                        console.log(res.data)
                        setTeams(res.data);
                    }).catch((err) => {
                        alert('Error fetching teams');
                        console.error('Error fetching teams:', err);
                    });
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        }

        fetchTeams();
    }, []);

    return (
        <div >
            <h2 className='project-container'>View Teams</h2>

            <div className="form" style={{ width: '425px' }}>
                {teams.map((team) => (
                    <ul key={team._id}>
                        <li >{team.teamName}</li>
                    </ul>

                ))}
            </div>
        </div>
    );
}

export default ViewTeams;
