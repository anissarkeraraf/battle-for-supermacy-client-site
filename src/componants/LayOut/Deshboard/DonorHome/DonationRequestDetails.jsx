import { MdBloodtype } from "react-icons/md";
import useDonorRequest from "../../../Hooks/useDonorRequest";
import { FaAddressBook, FaHospitalAlt } from "react-icons/fa";
// import { IoIosTime } from "react-icons/io";
import { CgCalendarDates } from "react-icons/cg";
import useDonors from "../../../Hooks/useDonors";



const DonationRequestDetails = () => {
    const [donorRequest] = useDonorRequest();
    const [donors] = useDonors();



    const name = (donorRequest[0]?.name);
    const bloodGroup = (donorRequest[0]?.bloodGroup);
    const address = (donorRequest[0]?.address);
    const recipientName = (donorRequest[0]?.recipientName);
    const district = (donorRequest[0]?.district);
    const upazila = (donorRequest[0]?.upazila);
    const donationDate = (donorRequest[0]?.donationDate);
    const donationTime = (donorRequest[0]?.donationTime);
    const hospitalName = (donorRequest[0]?.hospitalName);
    const requestMessage = (donorRequest[0]?.requestMessage);
    const image = (donors[0]?.image);
    console.log(donorRequest)



    return (
        <div>
            <div className="md:max-w-4xl mx-auto mt-28 md:h-[450px] overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">


                <div className="p-6">
                    <div>
                        <p className=" text-2xl md:text-3xl text-center mt-5 mb-10 font-bold">Blood RecipientName: <span className="text-yellow-600">{recipientName}</span></p>
                        <p className="flex items-center mb-4"><MdBloodtype className="text-3xl mr-3"></MdBloodtype> <span className="md:text-2xl font-medium">{bloodGroup}</span></p>

                        <p className="flex items-center mb-5"><FaAddressBook className="text-2xl mr-3"></FaAddressBook> <span className="md:text-xl font-medium">{address}, {upazila}, {district}</span></p>
                        <div className="flex mb-4">
                            <p className="flex items-center mr-6 md:mr-20"><CgCalendarDates className="text-3xl mr-3" /> <span className="md:text-xl font-medium">{donationDate}, {donationTime}</span></p>
                            <p className="flex items-center"><FaHospitalAlt className="text-2xl mr-3" /> <span className="md:text-xl font-medium">{hospitalName}</span></p>
                        </div>
                        <p className="mt-2 text-2xl font-bold text-gray-600 dark:text-gray-400">{requestMessage}.</p>

                    </div>
                    <div className="mt-5">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <img className="object-cover h-12 w-12 rounded-full" src={image} alt="Avatar" />
                                <p className="mx-2 font-semibold text-gray-700 dark:text-gray-200" role="link">{name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationRequestDetails;