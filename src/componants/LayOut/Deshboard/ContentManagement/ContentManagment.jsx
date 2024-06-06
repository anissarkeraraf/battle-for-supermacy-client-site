import { Helmet } from "react-helmet";
import { Link, Outlet } from "react-router-dom";

const ContentManagement = () => {
    return (
        <div>
            <Helmet>
                <title>Content Management || Blood Buddies</title>
            </Helmet>
            <h1 className="text-4xl text-center">Content Management</h1>
            <Link to="add-blog" className="btn btn-primary">
                Add Blog
            </Link>
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default ContentManagement;
