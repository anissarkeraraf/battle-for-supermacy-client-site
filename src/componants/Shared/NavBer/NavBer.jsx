import { Link } from "react-router-dom"; import useAuth from "../../Hooks/useAuth";
import { BiSolidDonateBlood } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useDonors from "../../Hooks/useDonors";
// import logo from '../../../../src/assets/blood-donated-icon.jpg'

const NavBer = () => {
    const { user, signOutUser } = useAuth();
    const [donor] = useDonors();
    // console.log(donor)


    const handleLogout = async () => {
        try {
            await signOutUser();
            toast.success('Log Out Successfully')
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const navLink = user ? (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/donationRequests">Donation Requests</Link></li>
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
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box dropdown-end">
                        {navLink}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl uppercase flex items-center"><span><BiSolidDonateBlood className="text-4xl text-[#EF3D32]" /></span>Blood Buddies</Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLink}
                </ul>
            </div>
            <div className="navbar-end">
                <li tabIndex={0} className="dropdown dropdown-end">
                    <a className="btn-ghost mr-5 rounded-btn avatar" role="button">
                        <div className="w-10 rounded-full">
                            <img src={donor[0]?.image || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'} alt="User Avatar" />
                        </div>
                    </a>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white text-black rounded-box w-52">
                        <li><Link to="/dashboard/donorHome">Dashboard</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                </li>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default NavBer;
