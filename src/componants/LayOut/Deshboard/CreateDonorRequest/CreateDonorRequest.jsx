import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useUpazila from '../../../Hooks/useUpazila';
import { useEffect, useState } from 'react';
import { districts } from '../../../DistricsAndUpazila/DistricsAndUpazila';
import useDonors from '../../../Hooks/useDonors';
import Swal from 'sweetalert2';

const CreateDonationRequest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [donor] = useDonors();
    // console.log(donor[0])

    const {
        register,
        handleSubmit,
        reset
    } = useForm();


    const onSubmit = async (data) => {
        // e.preventDefault();
        console.log(data)

        const userInfo = {
            name: data.name,
            email: data.email,
            bloodGroup: data.bloodGroup,
            address: data.address,
            recipientName: data.recipientName,
            district: data.district,
            upazila: data.upazila,
            donationDate: data.donationDate,
            donationTime: data.donationTime,
            hospitalName: data.hospitalName,
            requestMessage: data.requestMessage,
            bloodGroup: data.bloodGroup,
            status: ["pending", "inprogress", "done", "canceled"]

        }

        axiosSecure.post('/donorRequest', userInfo)
            .then(res => {
                if (res.data.insertedId) {
                    console.log('user added to the database')
                    reset();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Donor request added the database successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // navigate('/');
                }
            })


    };

    // Blocked user check
    if (user.status === 'blocked') {
        return <p>You are blocked and cannot create a donation request.</p>;
    }

    // Distric and upazila
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
        <div className="container mx-auto p-4">
           
            <div className='bg-gray-100'>
            <h2 className="text-3xl mb-4 text-center pt-4">Your need to blood</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-5 md:p-10">
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mb-4'>
                        <div>
                            <label>Requester Name:</label>
                            <input
                                {...register("name", { required: true })}
                                type="name"
                                value={donor[0]?.name}
                                readOnly
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label>Requester Email:</label>
                            <input
                                {...register("email", { required: true })}
                                type="email"
                                value={donor[0]?.email}
                                readOnly
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mb-4'>
                        <div>
                            <label>Recipient Name:</label>
                            <input {...register("recipientName", { required: true })}
                                type="name"
                                name="recipientName"
                                placeholder='Recipient Name'
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
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
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mb-4'>
                        <div>
                            <div>
                                <label htmlFor="district">
                                    <span>Recipient District:</span>
                                </label>
                            </div>
                            <select  {...register("district", { required: true })} id="district" name="district" value={searchParams.district} onChange={handleChange} required className="select select-bordered w-full">
                                <option value="">Select District</option>
                                {districts.map((district, index) => (
                                    <option key={index} value={district}>{district}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="upazila">
                                    <span>Recipient Upazila:</span>
                                </label>
                            </div>
                            <select  {...register("upazila", { required: true })} id="upazila" name="upazila" value={searchParams.upazila} onChange={handleChange} required className="select select-bordered w-full">
                                <option value="">Select Upazila</option>
                                {upazilas.map((upazila, index) => (
                                    <option key={index} value={upazila}>{upazila}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mb-4'>
                        <div>
                            <label>Hospital Name:</label>
                            <input
                                {...register("hospitalName", { required: true })}
                                type="name"
                                name="hospitalName"
                                placeholder=' like: Dhaka Medical College Hospita'
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div>
                            <label>Full Address:</label>
                            <input
                                {...register("address", { required: true })}
                                type="address"
                                name="address"
                                placeholder='like: Zahir Raihan Rd, Dhaka'
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mb-4'>
                        <div>
                            <label>Donation Date:</label>
                            <input
                                {...register("donationDate", { required: true })}
                                type="date"
                                name="donationDate"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div>
                            <label>Donation Time:</label>
                            <input
                                {...register("donationTime", { required: true })}
                                type="time"
                                name="donationTime"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label>Request Message:</label>
                        <textarea
                            {...register("requestMessage", { required: true })}
                            name="requestMessage"
                            placeholder='Why Need You Blood ?.........'
                            className="textarea textarea-bordered w-full h-32"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-yellow-700 w-1/6 text-white py-3 rounded">Request</button>
                </form>
            </div>
        </div>
    );
};

export default CreateDonationRequest;
