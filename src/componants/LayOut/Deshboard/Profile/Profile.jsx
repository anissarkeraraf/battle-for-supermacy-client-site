import { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';
import useDonors from '../../../Hooks/useDonors';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const Profile = () => {
    const { user } = useAuth();
    const [donor] = useDonors();
    const [isEditable, setIsEditable] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        image: '',
        district: '',
        upazila: '',
        bloodGroup: ''
    });
    const axiosSecure = useAxiosSecure();
    console.log(donor)

    useEffect(() => {
        if (donor && donor.length > 0) {
            setFormData({
                name: donor[0].name || '',
                email: donor[0].email || '',
                image: donor[0].image || '',
                district: donor[0].district || '',
                upazila: donor[0].upazila || '',
                bloodGroup: donor[0].bloodGroup || ''
            });
        }
    }, [donor]);

    const handleEditClick = () => {
        setIsEditable(true);
    };

    const handleSaveClick = async () => {
        try {
            const res = await axiosSecure.patch(`/doners/${user.email}`, formData);
            console.log('Axios request configuration:', res.config);
            if (res.data.modifiedCount){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${donor.name} updated successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            setIsEditable(false);
        } catch (error) {
            console.error('Error updating donor:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div>
            <Helmet>
                <title>Profile | Blood Buddies</title>
            </Helmet>
            <div className='bg-gray-100 mt-20'>
                <form className='p-4 md:p-20'>
                    <h2 className="text-2xl md:text-4xl uppercase text-center mb-10">Update Your Profile</h2>
                    <div className='edit-btn flex justify-end'>
                        {!isEditable ? (
                            <button className='bg-yellow-600 px-3 py-1 rounded text-white' type="button" onClick={handleEditClick}>Edit</button>
                        ) : (
                            <button className='bg-yellow-600 px-3 py-1 rounded text-white' type="button" onClick={handleSaveClick}>Save</button>
                        )}
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                        <div>
                            <div>
                                <label htmlFor="name">
                                    <span>Name:</span>
                                </label>
                            </div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                readOnly={!isEditable}
                            />
                        </div>
                        <div>
                            <div>
                                <label htmlFor="email">
                                    <span>Email:</span>
                                </label>
                            </div>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                className="input input-bordered w-full"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4'>
                        <div>
                            <div>
                                <label htmlFor="image">
                                    <span>Avatar:</span>
                                </label>
                            </div>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                readOnly={!isEditable}
                            />
                        </div>
                        <div>
                            <div>
                                <label htmlFor="district">
                                    <span>District:</span>
                                </label>
                            </div>
                            <input
                                type="text"
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                readOnly={!isEditable}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4'>
                        <div>
                            <div>
                                <label htmlFor="upazila">
                                    <span>Upazila:</span>
                                </label>
                            </div>
                            <input
                                type="text"
                                name="upazila"
                                value={formData.upazila}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                readOnly={!isEditable}
                            />
                        </div>
                        <div>
                            <div>
                                <label htmlFor="bloodGroup">
                                    <span>Blood Group:</span>
                                </label>
                            </div>
                            <input
                                type="text"
                                name="bloodGroup"
                                value={formData.bloodGroup}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                readOnly={!isEditable}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
