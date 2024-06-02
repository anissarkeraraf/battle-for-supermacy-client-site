import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../LayOut/Main/Main";
import Home from "../Pages/Home/Home/Home";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import DonorSearch from "../Pages/DonorSearch/DonorSearch";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/donerSearch',
        element: <DonorSearch></DonorSearch>
      }
    ]
  },
]);