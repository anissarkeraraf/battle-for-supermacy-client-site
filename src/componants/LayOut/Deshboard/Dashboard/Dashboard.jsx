import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { IoMenuOutline } from 'react-icons/io5';
import { FaBlog, FaHome, FaUser } from 'react-icons/fa';
import { BiSolidDonateBlood } from 'react-icons/bi';
import { LuMenuSquare } from 'react-icons/lu';
import { RiExchangeFundsFill } from 'react-icons/ri';
import { Helmet } from 'react-helmet';
import useAdmin from '../../../Hooks/useAdmin';
import useAuth from '../../../Hooks/useAuth'; // Assuming you have a useAuth hook
import { SiContentstack } from 'react-icons/si';
import { TbLogs } from 'react-icons/tb';
import useVolunteer from '../../../Hooks/useVolunteer ';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const openSidebarButtonRef = useRef(null);
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const [isVolunteer] = useVolunteer();

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
              {isAdmin && (
                <>
                  <li>
                    <NavLink to='/dashboard/adminHome' className='text-white flex items-center'><FaHome className='mr-2'></FaHome>Admin Home</NavLink>
                  </li>
                  <li>
                    <NavLink to='/dashboard/profile' className='text-white flex items-center'><FaUser className='mr-2'></FaUser> Profile</NavLink>
                  </li>
                  <li>
                    <NavLink to='/dashboard/all-users' className='text-white flex items-center'><BiSolidDonateBlood className='mr-2'></BiSolidDonateBlood> All Users Page</NavLink>
                  </li>
                  <li>
                    <NavLink to='/dashboard/all-blood-donation-request' className='text-white flex items-center'><LuMenuSquare className='mr-2'></LuMenuSquare>All Donation Request</NavLink>
                  </li>
                  <li>
                    <details className='text-white'>
                      <summary>
                        <NavLink to='/dashboard/content-management' className='text-white flex items-center'><SiContentstack className='mr-2' />Content Management</NavLink>
                      </summary>
                      <ul className="p-2">
                        <li>
                          <NavLink to='/dashboard/content-management/all-blogs' className='text-white flex items-center'><TbLogs className='mr-2' />All Blogs</NavLink>
                        </li>
                      </ul>
                    </details>
                  </li>
                </>
              )}

              {isVolunteer && (
                <>
                  <li>
                    <NavLink to='/dashboard/volunteerHome' className='text-white flex items-center'><FaHome className='mr-2'></FaHome>Volunteer Home</NavLink>
                  </li>
                  <li>
                    <NavLink to='/dashboard/profile' className='text-white flex items-center'><FaUser className='mr-2'></FaUser> Profile</NavLink>
                  </li>
                  <li>
                    <NavLink to='/dashboard/all-blood-donation-request' className='text-white flex items-center'><LuMenuSquare className='mr-2'></LuMenuSquare>All Donation Request</NavLink>
                  </li>
                  <li>
                    <details className='text-white'>
                      <summary>
                        <NavLink to='/dashboard/content-management' className='text-white flex items-center'><SiContentstack className='mr-2' />Content Management</NavLink>
                      </summary>
                      <ul className="p-2">
                        <li>
                          <NavLink to='/dashboard/content-management/all-blogs' className='text-white flex items-center'><TbLogs className='mr-2' />All Blogs</NavLink>
                        </li>
                      </ul>
                    </details>
                  </li>
                </>
              )}

              {!isAdmin && !isVolunteer && (
                <>
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
                </>
              )}

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

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
