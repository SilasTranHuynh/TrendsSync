import { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3307/profile-server', { withCredentials: true })
            .then(res => {
                if (res.data.status === "Success") {
                    setUser(res.data.user);
                } else {
                    setError(res.data.message);
                }
            })
            .catch(err => {
                setError("An error occurred while fetching user data.");
                console.error(err);
            });
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Welcome, {user.user_name}</h1>
            <p>Email: {user.user_username}</p>
        </div>
    );
}

export default Profile;
