import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [filter, setFilter] = useState('all');
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/blogs').then(response => {
            setBlogs(response.data);
        });
    }, [axiosSecure]);

    const handlePublish = (blogId) => {
        axiosSecure.patch(`/blogs/${blogId}`, { status: 'published' })
            .then(() => {
                setBlogs(blogs.map(blog => blog._id === blogId ? { ...blog, status: 'published' } : blog));
            });
    };

    const handleUnpublish = (blogId) => {
        axiosSecure.patch(`/blogs/${blogId}`, { status: 'draft' })
            .then(() => {
                setBlogs(blogs.map(blog => blog._id === blogId ? { ...blog, status: 'draft' } : blog));
            });
    };

    const handleDelete = (blogId) => {
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
                axiosSecure.delete(`/blogs/${blogId}`)
                    .then(() => {
                        setBlogs(blogs.filter(blog => blog._id !== blogId));
                        Swal.fire("Deleted!", "Your blog has been deleted.", "success");
                    });
            }
        });
    };

    const filteredBlogs = filter === 'all' ? blogs : blogs.filter(blog => blog.status === filter);

    return (
        <div>
            <h2>All Blogs</h2>
            <div>
                <label htmlFor="filter">Filter:</label>
                <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
            </div>
            <div>
                {filteredBlogs.map((blog) => (
                    <div key={blog._id} className="card mb-3">
                        <h3>{blog.title}</h3>
                        <div className="actions">
                            {blog.status === 'draft' && user.role === 'admin' && (
                                <button onClick={() => handlePublish(blog._id)} className="btn btn-success">
                                    Publish
                                </button>
                            )}
                            {blog.status === 'published' && user.role === 'admin' && (
                                <button onClick={() => handleUnpublish(blog._id)} className="btn btn-warning">
                                    Unpublish
                                </button>
                            )}
                            {user.role === 'admin' && (
                                <button onClick={() => handleDelete(blog._id)} className="btn btn-danger">
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllBlogs;
