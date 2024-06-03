import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-gray-300 p-4 fixed transform transition-transform duration-300 lg:translate-x-0">
      <h2 className="text-center text-2xl font-semibold mb-6">Dashboard</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <Link to="/dashboard" className="text-gray-800 hover:text-blue-500">
              Home
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/profile" className="text-gray-800 hover:text-blue-500">
              Profile
            </Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
