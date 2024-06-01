// import axios from 'axios';
// import { useState } from 'react';
// import { toast } from 'react-toastify';

const SignUp = () => {
    //   const [formData, setFormData] = useState({
    //     email: '',
    //     name: '',
    //     avatar: null,
    //     bloodGroup: 'A+',
    //     district: '',
    //     upazila: '',
    //     password: '',
    //     confirmPassword: ''
    //   });

    //   const handleChange = (e) => {
    //     const { name, value, files } = e.target;
    //     if (name === 'avatar') {
    //       setFormData({ ...formData, avatar: files[0] });
    //     } else {
    //       setFormData({ ...formData, [name]: value });
    //     }
    //   };

    //   const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (formData.password !== formData.confirmPassword) {
    //       toast.error('Passwords do not match');
    //       return;
    //     }
    //     try {
    //       const formDataAvatar = new FormData();
    //       formDataAvatar.append('image', formData.avatar);
    //       const imageBBResponse = await axios.post('https://api.imgbb.com/1/upload?key=YOUR_IMAGEBB_API_KEY', formDataAvatar);
    //       const avatarUrl = imageBBResponse.data.data.url;


    //       const registrationData = {
    //         ...formData,
    //         avatar: avatarUrl,
    //       };
    //       delete registrationData.confirmPassword; 


    //       await axios.post('/api/auth/register', registrationData);
    //       toast.success('Registration successful');
    //     } catch (error) {
    //       toast.error('Registration failed');
    //     }
    //   };

    return (
        <div className="bg-gray-300 md:w-2/3 mx-auto shadow-md">
            <h2 className="text-3xl text-center pt-4">Sign Up</h2>
            <form className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col justify-center mb-4">
                        <div>
                            <label className="lable-text">
                                <span>Email</span>
                            </label>
                        </div>
                        <input type="email" name="email" placeholder="Email" required className="input input-bordered w-full mb-4" />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="">
                                <span>Name</span>
                            </label>
                        </div>
                        <div>
                            <input type="text" name="name" placeholder="Name" required className="input input-bordered w-full mb-4" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <div>
                            <label htmlFor="">
                                <span>Blood Group</span>
                            </label>
                        </div>
                        <select name="bloodGroup" required className="select select-bordered w-full ">
                            <option value="blood">Select Your Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="">
                                <span>District</span>
                            </label>
                        </div>
                        <div>
                            <input type="text" name="district" placeholder="District" required className="input input-bordered w-full mb-4" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <div>
                            <label htmlFor="">
                                <span>Upazila</span>
                            </label>
                        </div>
                        <div>
                            <input type="text" name="upazila" placeholder="Upazila" required className="input input-bordered w-full mb-4" />
                        </div>
                    </div>

                    <div>
                        <div>
                            <label htmlFor="">
                                <span>chose your image file</span>
                            </label>
                        </div>
                        <input type="file" className="file-input file-input-bordered w-full" />
                    </div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <div>
                            <label htmlFor="">
                                <span>Password</span>
                            </label>
                        </div>
                        <div>
                            <input type="password" name="password" placeholder="Password" required className="input input-bordered w-full mb-4" />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="">
                                <span>Confirm Password</span>
                            </label>
                        </div>
                        <div>
                            <input type="password" name="confirmPassword" placeholder="Confirm Password" required className="input input-bordered w-full" />
                        </div>
                    </div>
                </div>
                <div>
                    <input type="submit" value="Sign Up" className="w-full bg-slate-600 p-2 rounded text-white mt-4"/>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
