import { Link } from "react-router-dom";


const Slide = ({ image }) => {
    return (
        <div className="mt-16">
            <div className="w-full bg-center bg-cover h-[300px] md:h-[500px] lg:h-[38rem]" style={{
                backgroundImage: `url(${image})`,
            }}
            >
                <div className="flex justify-start w-full h-full bg-gray-900/40">
                    <div className="md:pl-20 md:pt-36">
                        <h1 className="text-xl md:text-2xl font-semibold text-white lg:text-3xl">Donated blood, save life!</h1>
                        <p className="md:text-4xl lg:text-6xl font-bold text-white uppercase">Your blood <br /> can bring smile <br /> in other person face</p>
                        <div>
                            <Link to='/signup'>
                                <button className=" px-5 py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-[#4245BE] rounded lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500 mr-10">Join as a donor</button>
                            </Link>
                            <button className=" px-5 py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-[#4245BE] rounded lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">Search Donors</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slide;