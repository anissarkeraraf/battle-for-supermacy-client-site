import { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import DOMPurify from 'dompurify';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBlog = () => {
    const [content, setContent] = useState('');
    const editor = useRef(null);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        // Image upload to imagebb
        const formData = new FormData();
        formData.append('image', data.imageFile[0]);

        try {
            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.data.success) {
                // Sanitize HTML content
                const sanitizedHtml = DOMPurify.sanitize(content);

                // Extract plain text
                const plainText = sanitizedHtml.replace(/<[^>]*>/g, '');

                const blogData = {
                    title: data.title,
                    thumbnail: res.data.data.display_url,
                    content: plainText, // Save the plain text content
                    status: 'draft'
                };

                const response = await axiosSecure.post('/blogs', blogData);

                if (response.data.insertedId) {
                    console.log('Blog added to the database');
                    reset();
                    setContent('');
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Blog created successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/content-management');
                }
            }
        } catch (error) {
            console.error('Error uploading image or creating blog:', error);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error creating blog',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div>
            <Helmet>
                <title>Add Blog || Blood Buddies</title>
            </Helmet>
            <h2 className='text-3xl text-center'>Add Blog</h2>
            <form className='p-10' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <div>
                            <label htmlFor="title">
                                <span>Title:</span>
                            </label>
                        </div>
                        <div>
                            <input {...register('title', { required: true })} type="text" name="title" placeholder="Title" className="input input-bordered w-full mb-8" />
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="imageFile">
                            <span>Choose your image file:</span>
                        </label>
                    </div>
                    <input {...register('imageFile', { required: true })} name="imageFile" type="file" className="file-input file-input-bordered w-full mb-8" />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        onBlur={newContent => setContent(newContent)}
                        tabIndex={1}
                    />
                </div>
                <div className='mt-10'>
                    <button className="bg-yellow-700 text-white px-3 py-2 rounded" type="submit">Create Blogs</button>
                </div>
            </form>
        </div>
    );
};

export default AddBlog;
