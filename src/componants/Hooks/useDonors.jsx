import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useDonors = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const {refetch, data: donor = [] } = useQuery({
        queryKey: ['doners', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/doners/${user.email}`)
            return res.data;
        }
    })
    return [donor, refetch]
};

export default useDonors;