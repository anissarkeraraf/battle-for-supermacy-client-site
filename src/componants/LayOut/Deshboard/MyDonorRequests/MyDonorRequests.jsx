import { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useDonors from '../../../Hooks/useDonors';
import { GrView } from 'react-icons/gr';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useDonorRequest from '../../../Hooks/useDonorRequest';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const MyDonorRequests = () => {
    const { user } = useAuth();
    const [donor] = useDonors();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [requests, setRequests] = useState([]);
    const [filter, setFilter] = useState("all");
    const [donorRequest, refetch] = useDonorRequest();

    useEffect(() => {
        if (user?.email) {
            refetch();
        }
    }, [user?.email, refetch]);

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/donorRequests/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    }

    const handleStatusChange = async (id, status) => {
        await axiosPublic.patch(`/donorRequests/pending/${id}`, { status });
        refetch();
    };

    // Function to dynamically determine the status based on certain criteria
    const getStatus = (request) => {
        if (request?.confirmed && request?.inProgress) {
            return 'inprogress';
        } else if (request?.completed) {
            return 'done';
        } else if (request?.canceled) {
            return 'canceled';
        } else {
            return 'pending';
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-4xl mb-10 text-center">Welcome,<span className='text-violet-700'> {donor[0]?.name}</span></h2>
            <div className="mb-4 md:ml-52 lg:ml-56">
                <label htmlFor="statusFilter" className="block mb-2">Filter by status:</label>
                <select
                    id="statusFilter"
                    className="input input-bordered w-full md:w-2/4 lg:w-1/2"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option  onClick={() => handleStatusChange(donorRequest._id, 'pending')}  value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>
            {donorRequest.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table lg:w-10/12 mx-auto">
                        <thead className='bg-teal-500 bg-opacity-55 text-black'>
                            <tr>
                                <th>#</th>
                                <th>Recipient Name</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donorRequest.map((request, index) => (
                                <tr key={request._id}>
                                    <th>{index + 1}</th>
                                    <td>{request.recipientName}</td>
                                    <td>{request.upazila}, {request.district}</td>
                                    <td>{request.donationDate}</td>
                                    <td>{request.donationTime}</td>
                                    <td>{getStatus(request)}</td>
                                    <td>
                                        {getStatus(request) === 'inprogress' && (
                                            <>
                                                <button
                                                    onClick={() => handleStatusChange(request._id, 'done')}
                                                    className="btn btn-success btn-sm ml-2"
                                                >Done</button>
                                                <button
                                                    onClick={() => handleStatusChange(request._id, 'canceled')}
                                                    className="btn btn-danger btn-sm ml-2"
                                                >Cancel</button>
                                            </>
                                        )}
                                        {(getStatus(request) === 'pending' || getStatus(request) === 'inprogress') && (
                                            <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
                                                <Link to={`/dashboard/updatedRequest/${request._id}`}>
                                                    <button className='bg-yellow-500 px-3 py-1 rounded mb-2 lg:mb-0'><FaEdit className='text-xl '></FaEdit></button>
                                                </Link>
                                                <Link to={`/dashboard/details/${request._id}`}>
                                                    <button className='bg-gray-300 px-3 py-1 rounded mb-2 lg:mb-0'> <GrView className='text-xl' /></button>
                                                </Link>
                                                <button onClick={()                                                     => handleDelete(request._id)} className='bg-orange-400 px-2 py-1 rounded'><MdDelete className='text-xl mx-auto'></MdDelete></button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className='text-center mt-56'>No donation requests found.</p>
                )}
            </div>
        );
    };

    export default MyDonorRequests;

