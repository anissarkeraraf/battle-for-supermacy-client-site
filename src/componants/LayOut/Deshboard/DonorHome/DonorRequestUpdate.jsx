import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import useUpazila from "../../../Hooks/useUpazila";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useDonorRequest from "../../../Hooks/useDonorRequest";

const DonorRequestUpdate = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [donorRequest] = useDonorRequest();
    console.log(donorRequest)

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        const userInfo = {
            name: data.name,
            email: data.email,
            bloodGroup: data.bloodGroup,
            district: data.district,
            upazila: data.upazila,
            address: data.address,
            recipientName: data.recipientName,
            donationDate: data.donationDate,
            donationTime: data.donationTime,
            hospitalName: data.hospitalName,
            requestMessage: data.requestMessage,

        };

        console.log("Data to be sent:", userInfo); 

        try {
            const res = await axiosSecure.put(`/donorRequests/${donorRequest[0]?._id}`, userInfo);
            console.log("Server response:", res.data);

            if (res.data.modifiedCount > 0) {
                reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Donor request updated successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error("Error updating donor request", error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed to update donor request",
                showConfirmButton: true,
            });
        }
    };

    return (
        <div>
            <Helmet>
                <title>Donor Request Update | Blood Buddies</title>
            </Helmet>
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
                                    value={donorRequest[0]?.name}
                                    readOnly
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label>Requester Email:</label>
                                <input
                                    {...register("email", { required: true })}
                                    type="email"
                                    value={donorRequest[0]?.email}
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
                                    defaultValue={donorRequest[0]?.recipientName}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="district">
                                        <span>Blood Group:</span>
                                    </label>
                                </div>
                                <input
                                    {...register("bloodGroup", { required: true })}
                                    type="text"
                                    name="bloodGroup"
                                    defaultValue={donorRequest[0]?.bloodGroup}
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mb-4'>
                            <div>
                                <div>
                                    <label htmlFor="district">
                                        <span>Recipient District:</span>
                                    </label>
                                </div>
                                <input
                                    {...register("district", { required: true })}
                                    type="text"
                                    name="district"
                                    defaultValue={donorRequest[0]?.district}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="district">
                                        <span>Recipient Upazila:</span>
                                    </label>
                                </div>
                                <input
                                    {...register("upazila", { required: true })}
                                    type="text"
                                    name="upazila"
                                    defaultValue={donorRequest[0]?.upazila}
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mb-4'>
                            <div>
                                <label>Hospital Name:</label>
                                <input
                                    {...register("hospitalName", { required: true })}
                                    type="name"
                                    name="hospitalName"
                                    defaultValue={donorRequest[0]?.hospitalName}
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
                                    defaultValue={donorRequest[0]?.address}
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
                                    defaultValue={donorRequest[0]?.donationDate}
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
                                    defaultValue={donorRequest[0]?.donationTime}
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
                                defaultValue={donorRequest[0]?.requestMessage}
                                className="textarea textarea-bordered w-full h-32"
                                required
                            />
                        </div>
                        <button type="submit" className="bg-yellow-700 w-1/5 text-white py-3 rounded">Update Donor Request</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DonorRequestUpdate;
