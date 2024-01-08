import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { deleteUser } from "../../services/deleteUser";
import { fetchUsers } from "../../services/fetchUser";
import { fetchSessions } from "../../services/fetchSession";


import './Admin.css';
import { deleteSession } from "../../services/deleteSession";

const Admin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [updateTrigger, setUpdateTrigger] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
    const getData = async () => {
        try {
        const fetchedData = await fetchUsers();
        setData(fetchedData);

        const sessionResponse = await fetchSessions();
        setSessions(sessionResponse);

        setLoading(false);
        } catch (error) {
        setError(error);
        setLoading(false);
        }
    };
    getData();
    }, [updateTrigger]);

    const handleDelete = (id) => async () => {
        try {
            await deleteUser(id);
            setUpdateTrigger(prev => prev + 1);
        } catch (error) {
            setError(error);
        }
    }

    const handleDeleteSession = (id) => async () => {
        console.log(id);
        try {
            await deleteSession(id);
            setUpdateTrigger(prev => prev + 1);
        } catch (error) {
            setError(error);
        }
    }

    if (loading) {
    return <p>Loading...</p>;
    }

    if (error) {
    return <p>Error: {error}</p>;
    }

    return (
    <div className="container">
        <div className="row" style={{ display: 'flex' }}> {/* Flexbox container */}
            {/* Users Column */}
            <div className="col" style={{ flex: 1, marginRight: '20px' }}> {/* Flex item */}
                <div className="title">
                    Users
                </div>
            {data.map(item => (
                <div key={item.userId} className="row">
                    <span className="name">
                        Id:{item.userId} Name:{item.name} {item.surname}
                    </span>
                    <button className="delete" onClick={() => handleDelete(item.userId)}>Delete</button>
                </div>
            ))}
            </div>

            {/* Sessions Column */}
            <div className="col" style={{ flex: 1 }}> {/* Flex item */}
                <div className="title">Sessions</div>
                <div style={{ overflowY: 'auto', maxHeight: '350px' }}>
                    {sessions.map(item => (
                        <div key={item.userId} className="row">
                            <span className="name">
                                Id:{item.userId} Valid:{new Date(item.validUntil).toLocaleDateString()}
                            </span>
                            <button className="delete" onClick={handleDeleteSession(item.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    );
};

export default Admin;