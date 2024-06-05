import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useDonors = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    console.log("User object:", user);  // Log user object for debugging

    const { refetch, data: donor = [] } = useQuery({
        queryKey: ['doners', user?.email],
        queryFn: async () => {
            if (!user?.email) {
                console.warn("User email is not available.");
                return [];
            }
            try {
                console.log(`Fetching donors for user: ${user.email}`);
                const res = await axiosSecure.get(`/doners/${user.email}`);
                console.log("API response:", res);

                if (res.data) {
                    console.log("Donor data:", res.data);
                    return res.data;
                } else {
                    console.warn("No data returned from API.");
                    return [];
                }
            } catch (error) {
                console.error("Error fetching donors:", error);
                return [];
            }
        },
        enabled: !!user?.email,
    });

    return [donor, refetch];
};

export default useDonors;
