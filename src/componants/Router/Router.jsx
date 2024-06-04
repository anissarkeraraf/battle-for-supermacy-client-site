import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../LayOut/Main/Main";
import Home from "../Pages/Home/Home/Home";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import DonorSearch from "../Pages/DonorSearch/DonorSearch";
import Blog from "../Pages/Blog/Blog";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../LayOut/Deshboard/Dashboard/Dashboard";
import Profile from "../LayOut/Deshboard/Profile/Profile";
import MyDonorRequests from "../LayOut/Deshboard/MyDonorRequests/MyDonorRequests";
import DonorHome from "../LayOut/Deshboard/DonorHome/DonorHome";
import CreateDonorRequest from "../LayOut/Deshboard/CreateDonorRequest/CreateDonorRequest";
import DonorRequestUpdate from "../LayOut/Deshboard/DonorHome/DonorRequestUpdate";
import DonationRequestDetails from "../LayOut/Deshboard/DonorHome/DonationRequestDetails";

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
      },
      {
        path: '/blog',
        element: <Blog></Blog>
      }
    ]
  },
  // Dashboard
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: 'donorHome',
        element: <DonorHome></DonorHome>
      },
      {
        path: 'profile',
        element: <Profile></Profile>
      },
      {
        path: 'updatedRequest/:id',
        element: <DonorRequestUpdate></DonorRequestUpdate>
      },
      {
        path: 'details/:id',
        element: <DonationRequestDetails></DonationRequestDetails>
      },
      {
        path: 'my-donation-requests',
        element: <MyDonorRequests></MyDonorRequests>
      },
      {
        path: 'create-donation-request',
        element: <CreateDonorRequest></CreateDonorRequest>
      }
    ]
  }
]);