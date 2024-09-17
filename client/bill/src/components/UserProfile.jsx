import { useState } from "react";
import "../css/UserProfile.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UserProfile =  () => {
const navigate= useNavigate();
  const getUserFromSessionStorage = () => {
    try {
      const userData = sessionStorage.getItem('user');
      if (!userData) {
        throw new Error('No user data found in sessionStorage');
      }
      return JSON.parse(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null; // Return null or a default value if there's an error
    }
  };
  const user=getUserFromSessionStorage();
  
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: user.user,
     email: user.email,
    password: "",
  });
  const useremail=user.email;

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSave = async () => {

    const { firstName, email, password } = userDetails;
    setIsEditing(false);
    try {
      const response = await axios.post('http://localhost:5000/dashboard', {
        firstName,
        useremail,
        password,
        email,
      });
 console.log(response.data.success)
      if (response.data.success) {
        sessionStorage.setItem('user', JSON.stringify({user:firstName,email:email}))
        console.log(response.data.message)
        setUserDetails({ ...userDetails, [password]: ""});

      } else {
		console.log(response.data.message)
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };
  

  return (
    <div className="profile-container">
      <div className="profile-icon" onClick={toggleEditing}>
        {userDetails.firstName[0]}
      </div>

      {isEditing && (
        <div className="profile-edit-form">
          <h2>Edit Profile</h2>
          <input
            type="text"
            name="firstName"
            value={userDetails.firstName}
            onChange={handleChange}
            placeholder="First Name"
         
          />
          
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
             onChange={handleChange}
            placeholder="New Password"
          />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
