
import { FaUsers, FaDollarSign, FaTint } from 'react-icons/fa';

const AdminHome = ({ totalDonors, totalFunding, totalBloodRequests }) => {
   
  return (
    <div className="p-6 font-sans">
      {/* Welcome Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Welcome to the Admin Dashboard</h1>
        <p className="text-lg text-gray-600">Your contributions make a big difference!</p>
      </div>
      
      {/* Statistics Cards */}
      <div className="flex justify-around gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md text-center w-64">
          <FaUsers className="text-blue-500 text-5xl mx-auto mb-4" />
          <div>
            <h2 className="text-3xl font-bold">{totalDonors}</h2>
            <p className="text-gray-700">Total Donors</p>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md text-center w-64">
          <FaDollarSign className="text-green-500 text-5xl mx-auto mb-4" />
          <div>
            <h2 className="text-3xl font-bold">${totalFunding}</h2>
            <p className="text-gray-700">Total Funding</p>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md text-center w-64">
          <FaTint className="text-red-500 text-5xl mx-auto mb-4" />
          <div>
            <h2 className="text-3xl font-bold">{totalBloodRequests}</h2>
            <p className="text-gray-700">Total Blood Requests</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
