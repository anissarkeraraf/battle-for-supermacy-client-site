// import { useState } from 'react';
// import axios from 'axios';
import useAuth from '../../../Hooks/useAuth';
// import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const Profile = () => {
    const { user } = useAuth();
    // const axiosPublic = useAxiosPublic();
    //   const [userData, setUserData] = useState({
    //     name: '',
    //     email: '',
    //     avatar: '',
    //     address: {
    //       district: '',
    //       upazila: ''
    //     },
    //     bloodGroup: ''
    //   });

    //   const [isEditing, setIsEditing] = useState(false);

    //   useEffect(() => {
    //     // Fetch user data from the server
    //     axiosPublic.get('/api/user/profile')
    //       .then(response => {
    //         setUserData(response.data);
    //       })
    //       .catch(error => {
    //         console.error('There was an error fetching the user data!', error);
    //       });
    //   }, []);

    //   const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setUserData({
    //       ...userData,
    //       [name]: value
    //     });
    //   };

    //   const handleAddressChange = (e) => {
    //     const { name, value } = e.target;
    //     setUserData({
    //       ...userData,
    //       address: {
    //         ...userData.address,
    //         [name]: value
    //       }
    //     });
    //   };

    //   const handleEditClick = () => {
    //     setIsEditing(true);
    //   };

    //   const handleSaveClick = () => {
    //     // Save updated data to the server
    //     axios.put('/api/user/profile', userData)
    //       .then(response => {
    //         setUserData(response.data);
    //         setIsEditing(false);
    //       })
    //       .catch(error => {
    //         console.error('There was an error updating the user data!', error);
    //       });
    //   };

    return (
        <div>
            <h1>Profile Page</h1>
            <form>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={user?.displayName}
                        readOnly
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        defaultValue={user?.email}
                        readOnly
                    />
                </div>
                <div>
                    <label>Avatar:</label>
                    <input
                        type="text"
                        name="avatar"
                        defaultValue={user?.photoURL}
                        readOnly
                    />
                </div>
                <div>
                    <label>District:</label>
                    <input
                        type="text"
                        name="district"
                        readOnly
                    />
                </div>
                <div>
                    <label>Upazila:</label>
                    <input
                        type="text"
                        name="upazila"
                        readOnly
                    />
                </div>
                <div>
                    <label>Blood Group:</label>
                    <input
                        type="text"
                        name="bloodGroup"
                        readOnly
                    />
                </div>

                <button type="button">Save</button>

                <button type="button">Edit</button>

            </form>
        </div>
    );
};

export default Profile;
