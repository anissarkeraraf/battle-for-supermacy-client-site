import { Outlet } from "react-router-dom";
import NavBer from "../../Shared/NavBer/NavBer";


const Main = () => {
    return (
        <div>
            <NavBer></NavBer>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;