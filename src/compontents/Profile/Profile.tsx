import { useEffect, useState } from "react";
import { fetchUser } from "../../services/fetchUser";
// import { useParams } from "react-router-dom";

import "./Profile.css";

const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [session] = useState(JSON.parse(localStorage.getItem("session")));

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchUser(session.userId);
        setData(fetchedData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="profile-data">
      <h1>Profile</h1>
      <div className="content">
          <div className="user-info">
              <p>Name: {data.name}</p>
              <p>Surname: {data.surname}</p>
              <p>Age: {data.age}</p>
              <p>Email: {data.email}</p>
          </div>
          <div className="hello-text">
              <img src={`https://api.multiavatar.com/${data.name}${data.surname}.svg`} alt="profile photo" />
          </div>
      </div>
  </div>

  );
};

export default Profile;
