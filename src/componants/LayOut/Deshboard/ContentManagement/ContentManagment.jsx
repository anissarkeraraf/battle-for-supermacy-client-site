import { Helmet } from 'react-helmet';
import { Link, Outlet } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';

const ContentManagement = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';

    return (
        <div>
            <Helmet>
                <title>Content Management || Blood Buddies</title>
            </Helmet>
            <h1 className="text-3xl md:text-4xl text-center mt-10 font-bold">Content Management</h1>
            <Link to="add-blog" className="flex justify-end mr-16 md:mr-10 mt-10 md:mt-0">
                <button className="bg-yellow-700 text-white px-3 py-2 rounded">Add Blog</button>
            </Link>
            <div className="flex-1">
                <Outlet context={{ isAdmin }} />
            </div>
        </div>
    );
};

export default ContentManagement;
