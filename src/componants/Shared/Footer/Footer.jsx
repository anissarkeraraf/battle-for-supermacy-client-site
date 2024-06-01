import { BiSolidDonateBlood } from "react-icons/bi";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";


const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 bg-neutral text-neutral-content mt-20">
                <aside>
                    <BiSolidDonateBlood className="text-7xl text-[#EF3D32]"></BiSolidDonateBlood>
                    <p className="text-4xl uppercase">Blood Buddies</p>
                </aside>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Social</h6>
                    <div className="grid grid-flow-col gap-4">
                        <FaYoutube className="text-2xl"></FaYoutube>
                        <FaFacebook className="text-2xl"></FaFacebook>
                        <FaInstagram className="text-2xl"></FaInstagram>
                    </div>
                </nav>

            </footer>
            <div className="footer footer-center p-4 bg-neutral text-white">
                <aside>
                    <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
                </aside>
            </div>
        </div>
    );
};

export default Footer;