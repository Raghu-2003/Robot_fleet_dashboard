import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const App = () => {
    const [robots, setRobots] = useState([]);

    const fetchData = async () => {
        const response = await axios.get('http://localhost:8000/robots');
        setRobots(response.data);
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Robot Fleet Monitoring Dashboard</h1>
            <ul>
                {robots.map(robot => (
                    <li key={robot.id}>
                        ID: {robot.id}, Status: {robot.online ? 'Online' : 'Offline'}, Battery: {robot.battery}%
                    </li>
                ))}
            </ul>
            <MapContainer center={[37.7749, -122.4194]} zoom={13} style={{ height: '400px', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {robots.map(robot => (
                    <Marker key={robot.id} position={robot.location}>
                        <Popup>{robot.id}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default App;
