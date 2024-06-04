import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useDonorRequest = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();  // Ensure useAuth() is called correctly
    const { refetch, data: donorRequest = [] } = useQuery({
        queryKey: ['donorRequest', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];  // Guard clause if email is not present
            const res = await axiosSecure.get(`/donorRequest/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,  // Ensure query runs only if email is available
    });

    return [donorRequest, refetch];
};

export default useDonorRequest;
