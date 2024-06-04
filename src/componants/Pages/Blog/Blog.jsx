import { useEffect, useState } from "react";
import { FaBook, FaCalendar, FaUser } from "react-icons/fa";
import blogImg from '../../../assets/blog.jpg'
import { Helmet } from "react-helmet";


const Blog = () => {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('blog.json')
            .then(res => res.json())
            .then(data => {
                setBlogs(data)
            })
    }, [blogs])

    return (
        <div>
            <Helmet>
                <title>Blog | Blood Buddies</title>
            </Helmet>
            <div className="relative mb-10">
                <img src={blogImg} alt="" className="w-full h-[250px]" />
                <p className="absolute text-4xl md:text-5xl uppercase font-bold  top-24 left-[120px] md:left-[250px] lg:left-[520px]">Blog Posts</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:p-5">
                {
                    blogs.map(blog => <div key={blog.id} className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                        <img src={blog.image} alt="" />

                        <div className="p-6">
                            <div>
                                <p className="text-3xl mb-4">{blog.title}</p>
                                <div className="flex  justify-start mb-4">
                                    <p className="flex items-center mr-10"><FaUser className="mr-3"></FaUser><span>{blog.ptProblem}</span></p>
                                    <p className="flex items-center mr-10"><FaBook className="mr-3"></FaBook><span>{blog.relation}</span></p>
                                    <p className="flex items-center"><FaCalendar className="mr-3"></FaCalendar><span>{blog.date}</span></p>
                                </div>
                                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">{blog.description}</p>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Blog;