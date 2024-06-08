import { useState } from 'react';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useDonors from '../../../Hooks/useDonors';

const AllBlogs = () => {
    const [filter, setFilter] = useState('all');
    const { user } = useAuth();
    const [donors] = useDonors();
    const axiosSecure = useAxiosSecure();
    const isAdmin = donors[0]?.role === 'admin';

    const { data: blogs = [], refetch } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/blogs');
            return res.data;
        }
    });

    const handlePublish = async (id) => {
        try {
            await axiosSecure.patch(`/blogs/published/${id}`, { status: 'published' });
            refetch();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your blog has been published",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error("Error publishing blog:", error);
        }
    };

    const handleUnpublish = async (id) => {
        try {
            await axiosSecure.patch(`/blogs/draft/${id}`, { status: 'draft' });
            refetch();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your blog has been unpublished",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error("Error unpublishing blog:", error);
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/blogs/${id}`);
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your blog has been deleted",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } catch (error) {
                    console.error("Error deleting blog:", error);
                }
            }
        });
    };

    const filteredBlogs = filter === 'all' ? blogs : blogs.filter(blog => blog.status === filter);

    return (
        <div>
            <h2 className='text-3xl text-center font-medium'>All Blogs</h2>
            <div className='md:ml-16 lg:ml-44 mt-5 p-3'>
                <div>
                    <label htmlFor="filter">
                        <span>Select One:</span>
                    </label>
                </div>
                <div>
                    <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} className="select select-bordered w-full md:w-10/12 lg:w-1/2">
                        <option value="all">All</option>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>
            </div>
            <div>
                {filteredBlogs.map((blog) => (
                    <div key={blog._id} className="card mt-10 mb-3 p-3 md:p-10 shadow-lg md:mx-10 lg:mx-36">
                        <div>
                            <img className='w-full rounded' src={blog.thumbnail} alt="" />
                        </div>
                        <h3 className='text-3xl mt-4 mb-4 font-bold'>{blog.title}</h3>
                        <p className='mb-4'>{blog.content}</p>
                        <div className="actions">
                            {isAdmin && (
                                <>
                                    {blog.status === 'draft' && (
                                        <button onClick={() => handlePublish(blog._id)} className="bg-[#FF3D48] text-white py-1 px-3 rounded">
                                            Publish
                                        </button>
                                    )}
                                    {blog.status === 'published' && (
                                        <button onClick={() => handleUnpublish(blog._id)} className="bg-[#FF3D48] text-white py-1 px-4 rounded">
                                            Unpublish
                                        </button>
                                    )}
                                    <button onClick={() => handleDelete(blog._id)} className="bg-[#FF3D48] ml-5 text-white px-3 py-1 rounded">
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllBlogs;
