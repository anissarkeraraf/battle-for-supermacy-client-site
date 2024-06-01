import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";


const ContactUs = () => {
    return (
        <div >

            <div className="bg-gray-100 px-36">
                <h2 className="text-4xl text-center pt-5 mb-5">Contact Us</h2>
                <div className="flex justify-around mb-5">
                    <p className="flex items-center"><FaPhoneAlt className="bg-[#EF3D32] rounded text-4xl p-2 text-white"></FaPhoneAlt><span className="text-black ml-4 hover:text-[#EF3D32] duration-500">+093-120-525-9162</span></p>
                    <p className="flex items-center"><MdOutlineMail className="bg-[#EF3D32] rounded text-4xl p-2 text-white" /><span className="text-black ml-4 hover:text-[#EF3D32] duration-500">query@yourdomain.com</span></p>
                </div>
                <div>
                    <input type="text" placeholder="Name" className="input input-bordered input-md w-full mb-5" />
                </div>
                <div>
                    <input type="text" placeholder="Email" className="input input-bordered input-md w-full mb-5 " />
                </div>
                <div>
                    <input type="text" placeholder="Subject" className="input input-bordered input-md w-full mb-5" />
                </div>
                <div className="mx-auto">
                    <textarea placeholder="Bio" className="textarea textarea-bordered textarea-md w-full" ></textarea>
                </div>
                <button className="uppercase p-4 bg-[#EF3D32] hover:bg-[#4E4E4E] duration-300 mt-4 rounded text-white">Send Now</button>
            </div>
        </div>
    );
};

export default ContactUs;