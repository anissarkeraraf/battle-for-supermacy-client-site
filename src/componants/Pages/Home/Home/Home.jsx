import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import ContactUs from "../Contact/ContactUs";
import Featured from "../Featured/Featured";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Blood Buddies</title>
            </Helmet>
            <Banner></Banner>
            <Featured></Featured>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;