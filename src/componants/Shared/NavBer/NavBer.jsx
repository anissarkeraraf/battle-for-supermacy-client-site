import { Link } from "react-router-dom"; import useAuth from "../../Hooks/useAuth";

const NavBer = () => {
    const { user, signOutUser } = useAuth();

    const handleLogout = async () => {
        try {
            await signOutUser();
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const navLink = user ? (
        <>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/donation-requests">Donation Requests</Link></li>
            <li><Link to="/fundings">Fundings</Link></li>
        </>
    ) : (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/donation-requests">Donation Requests</Link></li>
            <li><Link to="/signup">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </>
    );

    return (
        <div className="navbar bg-white text-black glass z-50 fixed">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLink}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl uppercase">Blood Buddies</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLink}
                </ul>
            </div>
            <div className="navbar-end">
                <li tabIndex={0} className="dropdown dropdown-end">
                    <a className="btn btn-ghost rounded-btn avatar" role="button">
                        <div className="w-10 rounded-full">
                            <img src={user?.photoURL || 'default-avatar.png'} alt="User Avatar" />
                        </div>
                    </a>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white text-black rounded-box w-52">
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                </li>
            </div>
        </div>
    );
};

export default NavBer;
