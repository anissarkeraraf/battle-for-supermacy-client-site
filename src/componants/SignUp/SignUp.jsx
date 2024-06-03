// import axios from 'axios';
// import { useState } from 'react';
// import { toast } from 'react-toastify';

import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { districts } from "../DistricsAndUpazila/DistricsAndUpazila";
import { useEffect, useState } from "react";
import useUpazila from "../Hooks/useUpazila";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const SignUp = () => {

    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const { createUser, updateUserProfile } = useAuth();

    const onSubmit = async (data) => {
        console.log(data);
        // image uploaded to imagebb
        const imageFile = { image: data.imageFile[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }

        })
        if (res.data.success) {
           const userInfo = {
                name: data.name,
                email: data.email,
                bloodGroup: data.bloodGroup,
                district: data.district,
                upazila: data.upazila,
                image: res.data.data.display_url
            }

            console.log(res.data)
            createUser(data.email, data.password)
                .then(result => {
                    console.log(result);

                    const imageUrl = res.data.data.display_url;

                    updateUserProfile({
                        displayName: data.name,
                        photoURL: imageUrl
                    });

                    axiosPublic.post('/doners', userInfo)
                        .then(res => {
                            if (res.data.insertedId) {
                                console.log('user added to the database')
                                reset();
                                Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: "User created successfully",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate('/');
                            }
                        })
                    navigate();
                })
                .catch(error => {
                    console.log(error.message)
                })
        }
    }

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

    // const [donors, setDonors] = useState([]);
    const [searchParams, setSearchParams] = useState({
        bloodGroup: 'A+',
        district: '',
        upazila: ''
    });
    const upazilas = useUpazila(searchParams.district);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prevParams) => ({
            ...prevParams,
            [name]: value
        }));
    };

    useEffect(() => {
        if (searchParams.district) {
            setSearchParams((prevParams) => ({
                ...prevParams,
                upazila: ''
            }));
        }
    }, [searchParams.district]);

    return (
        <div className="bg-gray-300 md:w-2/3 mx-auto shadow-md">
            <h2 className="text-3xl text-center pt-4">Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col justify-center md:mb-4">
                        <div>
                            <label className="lable-text">
                                <span>Email:</span>
                            </label>
                        </div>
                        <input {...register("email", { required: true })} type="email" name="email" placeholder="Email" required className="input input-bordered w-full" />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="">
                                <span>Name:</span>
                            </label>
                        </div>
                        <div>
                            <input {...register("name", { required: true })} type="text" name="name" placeholder="Name" required className="input input-bordered w-full" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                    <div>
                        <div>
                            <label htmlFor="">
                                <span>Blood Group:</span>
                            </label>
                        </div>
                        <select {...register("bloodGroup", { required: true })} name="bloodGroup" required className="select select-bordered w-full ">
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
                            <label htmlFor="district">
                                <span>District:</span>
                            </label>
                        </div>
                        <select  {...register("district", { required: true })} id="district" name="district" value={searchParams.district} onChange={handleChange} required className="select select-bordered w-full">
                            <option value="">Select District</option>
                            {districts.map((district, index) => (
                                <option key={index} value={district}>{district}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                    <div>
                        <div>
                            <label htmlFor="upazila">
                                <span>Upazila:</span>
                            </label>
                        </div>
                        <select  {...register("upazila", { required: true })} id="upazila" name="upazila" value={searchParams.upazila} onChange={handleChange} required className="select select-bordered w-full">
                            <option value="">Select Upazila</option>
                            {upazilas.map((upazila, index) => (
                                <option key={index} value={upazila}>{upazila}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <div>
                            <label htmlFor="">
                                <span>chose your image file:</span>
                            </label>
                        </div>
                        <input {...register("imageFile", { required: true })} name="imageFile" type="file" className="file-input file-input-bordered w-full" />
                    </div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <div>
                            <label htmlFor="">
                                <span>Password:</span>
                            </label>
                        </div>
                        <div>
                            <input {...register("password", { required: true })} type="password" name="password" placeholder="Password" required className="input input-bordered w-full mb-4" />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="">
                                <span>Confirm Password:</span>
                            </label>
                        </div>
                        <div>
                            <input {...register("confirmPassword", { required: true })} type="password" name="confirmPassword" placeholder="Confirm Password" required className="input input-bordered w-full" />
                        </div>
                    </div>
                </div>
                <div>
                    <input type="submit" value="Sign Up" className="w-full bg-slate-600 p-2 rounded text-white mt-4" />
                </div>
            </form>
            <p className="pb-4 text-sm text-center">
                Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login here</a>
            </p>
        </div>
    );
};

export default SignUp;
