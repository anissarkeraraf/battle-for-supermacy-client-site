import { useState, useEffect } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [perPage] = useState(10);
    const [openMenuId, setOpenMenuId] = useState(null); // State to track which dropdown is open

    const axiosSecure = useAxiosSecure();
    const { data: donor = [], refetch } = useQuery({
        queryKey: ['donor', filter, page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/doners?status=${filter}&page=${page}&perPage=${perPage}`);
            return res.data;
        },
        keepPreviousData: true,
    });
      console.log(donor[0])



    const handleBlock = async (_id) => {
        axiosSecure.patch(`/doner/block/${_id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: 'This user has been blocked',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };

    const handleUnblock = async (_id) => {
        axiosSecure.patch(`/doner/unblock/${_id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: 'This user has been unblocked',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };

    const handleMakeVolunteer = async (_id) => {
        axiosSecure.patch(`/doner/volunteer/${_id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: 'This user is now volunteered',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };

    const handleMakeAdmin = async (_id) => {
        axiosSecure.patch(`/doner/admin/${_id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: 'This user is now Admin',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setPage(1);
    };

    // Function to toggle the dropdown menu
    const handleMenuClick = (_id) => {
        setOpenMenuId(openMenuId === _id ? null : _id);
    };

    return (
        <div className="p-6 font-sans">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-4">All Users</h1>
                <select onChange={handleFilterChange} value={filter} className="p-2 border rounded">
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">#</th>
                            <th className="py-3 px-6 text-left">Avatar</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Role</th>
                            <th className="py-3 px-6 text-left">Status</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {donor.map((user, index) => (
                            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{index + 1}<span className='text-xl font-medium'>.</span></td>
                                <td className="py-3 px-6 text-left">
                                    <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full" />
                                </td>
                                <td className="py-3 px-6 text-left">{user.email}</td>
                                <td className="py-3 px-6 text-left">{user.name}</td>
                                <td className="py-3 px-6 text-left">{user.role}</td>
                                <td>
                                    {user.role === 'block' ? 'Block' : <button
                                        onClick={() => handleBlock(user._id)}
                                        className="bg-orange-600 font-medium p-2 rounded text-white">Active
                                    </button>}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <div className="relative">
                                        <button
                                            className="focus:outline-none"
                                            onClick={() => handleMenuClick(user._id)}
                                        >
                                            <FaEllipsisV />
                                        </button>
                                        {openMenuId === user._id && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
                                                {user.role === 'active' ? (
                                                    <button
                                                        onClick={() => handleBlock(user._id)}
                                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                    >
                                                        Block
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleUnblock(user._id)}
                                                        className="block w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-gray-100"
                                                    >
                                                        Unblock
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleMakeVolunteer(user._id)}
                                                    className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                                                >
                                                    Make Volunteer
                                                </button>
                                                <button
                                                    onClick={() => handleMakeAdmin(user._id)}
                                                    className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                                                >
                                                    Make Admin
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
                <button
                    onClick={() => setPage(page > 1 ? page - 1 : 1)}
                    className="mx-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    Previous
                </button>
                <span className="mx-2 px-4 py-2">{page}</span>
                <button
                    onClick={() => setPage(users.length === perPage ? page + 1 : page)}
                    className="mx-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllUsers;
