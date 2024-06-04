import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { IoMenuOutline } from 'react-icons/io5';
// import useAuth from '../../../Hooks/useAuth';
import { FaBlog, FaHome, FaUser } from 'react-icons/fa';
import { BiSolidDonateBlood } from 'react-icons/bi';
import { LuMenuSquare } from 'react-icons/lu';
import { RiExchangeFundsFill } from 'react-icons/ri';
import { Helmet } from 'react-helmet';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [showWelcome, setShowWelcome] = useState(true);
  const sidebarRef = useRef(null);
  const openSidebarButtonRef = useRef(null);
  // const { user } = useAuth();
  // const location = useLocation();

  const handleOpenSidebar = (e) => {
    e.stopPropagation();
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target) &&
      openSidebarButtonRef.current && !openSidebarButtonRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   if (location.pathname === '/dashboard') {
  //     setShowWelcome(true);
  //   } else {
  //     setShowWelcome(false);
  //   }
  // }, [location]);

  return (
    <div>
      <Helmet>
        <title>Dashboard | Blood Buddies</title>
      </Helmet>
      <div className="flex">
        <button
          id="open-sidebar"
          ref={openSidebarButtonRef}
          onClick={handleOpenSidebar}
          className='menu p-4 md:p-10 lg:hidden'
        >
          <IoMenuOutline className='text-2xl' />
        </button>

        <div
          id="sidebar"
          ref={sidebarRef}
          className={`fixed lg:static min-h-screen top-0 left-0 w-64 bg-gray-800 transform transition-transform 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:block`}
        >
          <div className='p-2'>
            <h2 className="text-3xl text-white">Dashboard</h2>
            <ul className='menu'>
              <li>
                <NavLink to='/dashboard/donorHome' className='text-white flex items-center'><FaHome className='mr-2'></FaHome>Donor Home</NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/profile' className='text-white flex items-center'><FaUser className='mr-2'></FaUser> Profile</NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/my-donation-requests' className='text-white flex items-center'><BiSolidDonateBlood className='mr-2'></BiSolidDonateBlood>My Donation Requests</NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/create-donation-request' className='text-white flex items-center'><LuMenuSquare className='mr-2'></LuMenuSquare>Create Donation Request</NavLink>
              </li>

              {/* Shared Navbar */}
              <div className="divider divider-neutral"></div>
              <ul className='text-white menu'>
                <li><Link className='flex items-center' to="/"><FaHome className='mr-2'></FaHome>Home</Link></li>
                <li><Link className='flex items-center' to="/blog"><FaBlog className='mr-2'></FaBlog>Blog</Link></li>
                <li><Link className='flex items-center' to="/donationRequests"><BiSolidDonateBlood className='mr-2'></BiSolidDonateBlood>Donation Requests</Link></li>
                <li><Link className='flex items-center' to="/fundings"><RiExchangeFundsFill className='mr-2'></RiExchangeFundsFill>Fundings</Link></li>
              </ul>
            </ul>

          </div>

        </div>

        {/* <div className='flex-1'>
        {showWelcome && (
          <div className='welcome-section flex justify-center items-center text-4xl'>
            {user && (
              <p>{user.displayName} Welcome</p>
            )}
          </div>
        )}
      </div> */}

        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
