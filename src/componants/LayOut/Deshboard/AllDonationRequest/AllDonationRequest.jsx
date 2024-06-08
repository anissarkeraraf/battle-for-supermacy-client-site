import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import useVolunteer from "../../../Hooks/useVolunteer ";

const AllDonationRequest = () => {
    const axiosSecure = useAxiosSecure();
    const [isVolunteer] = useVolunteer();

    const { data: donorRequest = [], refetch } = useQuery({
        queryKey: ['donorRequest'],
        queryFn: async () => {
            const res = await axiosSecure.get('/donorRequest');
            return res.data;
        }
    });

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
                axiosSecure.delete(`/donorRequests/${id}`)
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
    };

    const handleUpdateStatus = (id, status) => {
        axiosSecure.patch(`/donorRequests/${id}`, { status })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Updated!",
                        text: "The donation status has been updated.",
                        icon: "success"
                    });
                }
            });
    };

    return (
        <div>
            <Helmet>
                <title>All Donation Request || Blood Buddies</title>
            </Helmet>
            <h2 className="text-4xl text-center mt-5 mb-10">All donation Request page for You</h2>
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
                                    <td>
                                        {request.status ? request.status : 'Pending'}
                                    </td>
                                    <td>
                                        {request.status === 'inprogress' && (
                                            <>
                                                <button 
                                                    className="btn btn-success btn-sm ml-2"
                                                    onClick={() => handleUpdateStatus(request._id, 'done')}
                                                >Done</button>
                                                <button
                                                    className="btn btn-danger btn-sm ml-2"
                                                    onClick={() => handleUpdateStatus(request._id, 'cancelled')}
                                                >Cancel</button>
                                            </>
                                        )}
                                        {request.status !== 'inprogress' && !isVolunteer && (
                                            <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
                                                <Link to={`/dashboard/details/${request._id}`}>
                                                    <button className='bg-gray-300 px-3 py-1 rounded mb-2 lg:mb-0'> <GrView className='text-xl' /></button>
                                                </Link>
                                                <button onClick={() => handleDelete(request._id)} className='bg-orange-400 px-2 py-1 rounded'><MdDelete className='text-xl mx-auto'></MdDelete></button>
                                            </div>
                                        )}
                                        {isVolunteer && request.status !== 'inprogress' && (
                                            <Link to={`/dashboard/details/${request._id}`}>
                                                <button className='bg-gray-300 px-3 py-1 rounded'> <GrView className='text-xl' /></button>
                                            </Link>
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

export default AllDonationRequest;
