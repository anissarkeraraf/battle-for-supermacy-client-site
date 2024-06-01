import Footer from "../../../Shared/Footer/Footer";
import Banner from "../Banner/Banner";
import ContactUs from "../Contact/ContactUs";
import Featured from "../Featured/Featured";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Featured></Featured>
            <ContactUs></ContactUs>
            <Footer></Footer>
        </div>
    );
};

export default Home;