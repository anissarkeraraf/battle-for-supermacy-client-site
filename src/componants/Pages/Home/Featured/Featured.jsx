import { BsFillBuildingFill } from "react-icons/bs";
import { FaHeartbeat, FaUsers } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";


const Featured = () => {
    return (
        <div>
            <h2 className="text-center text-5xl mt-5 ">Featured</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 p-10">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="text-black hover:text-red-600">
                            <h2 className="card-title ml-36 md:ml-[104px] lg:ml-20 transition-all duration-500 transform"><FaHeartbeat className=" text-5xl "></FaHeartbeat></h2>
                        </div>
                        <p className="text-red-500 text-center text-4xl font-bold">2578</p>
                        <p className="text-3xl text-center">Success Smile</p>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div>
                            <div className="text-black hover:text-red-500">
                                <h2 className="card-title ml-36 md:ml-[104px] lg:ml-20 transition-all duration-500 transform"><MdBloodtype className="text-5xl" /></h2>
                            </div>
                            <p className="text-red-500 text-center text-4xl font-bold mb-3">3235</p>
                            <p className="text-3xl text-center">Happy Donors</p>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="text-black hover:text-red-500">
                            <h2 className="card-title ml-36 md:ml-[104px] lg:ml-20 transition-all duration-500 transform"><FaUsers className=" text-5xl"></FaUsers></h2>
                        </div>
                        <p className="text-red-500 text-center text-4xl font-bold">3568</p>
                        <p className="text-3xl text-center">Happy Recipient</p>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="text-black hover:text-red-500 transition-all duration-500 transform">
                            <h2 className="card-title ml-36 md:ml-[104px] lg:ml-20"><BsFillBuildingFill className="text-5xl" /></h2>
                        </div>
                        <p className="text-red-500 text-center text-4xl font-bold">1364</p>
                        <p className="text-3xl text-center">Total Awards</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;