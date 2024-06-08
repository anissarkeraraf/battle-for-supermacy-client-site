import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useDonorRequest = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { refetch, data: donorRequest = [] } = useQuery({
        queryKey: ['donorRequest', user?.email],
        queryFn: async () => {
            if (!user?.email) return []; 
            const res = await axiosSecure.get(`/donorRequest/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,  
    });

    return [donorRequest, refetch];
};

export default useDonorRequest;
