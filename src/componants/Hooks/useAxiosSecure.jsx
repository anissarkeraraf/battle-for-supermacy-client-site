import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'https://assignment-battle-for-supremacy-server.vercel.app/'
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {signOutUser} = useAuth();
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interceptors', token)
        config.headers.authorization = `Beare ${token}`
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    // intercepts 401 and 403 status;
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // console.log('status error in the interceptor', status);
        if (status === 401 || status === 403) {
            await signOutUser();
            navigate('/login');
        }
        return Promise.reject(error);
    })


    return axiosSecure;
};

export default useAxiosSecure;