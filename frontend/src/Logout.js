import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/logout') // Hit the logout endpoint
            .then(() => {
                sessionStorage.clear();
                navigate('/login'); // Redirect to the login page after logout
            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });
    }, [navigate]);

    return (
        <div>
            <p>Logging out...</p>
            {/* Try to add a loading spinner or some other indicator here */}
        </div>
    );
}

export default Logout;
