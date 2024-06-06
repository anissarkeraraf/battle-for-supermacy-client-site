// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "./useAxiosSecure";
// import useAuth from "./useAuth";
// import useDonorRequest from "./useDonorRequest";

// const useDonorRequestWithId = () => {
//     const axiosSecure = useAxiosSecure();
//     const { user } = useAuth();
//     const [donorRequest] = useDonorRequest();
//     console.log(donorRequest)
//     const { refetch, data: donorRequestsId = [] } = useQuery({
//         queryKey: ['donorRequestsId', donorRequest?._id],
//         queryFn: async () => {
//             if (!user?.email) return [];
//             const res = await axiosSecure.get(`/donorRequests/${donorRequest._id}`);
//             return res.data;
//         },
//         enabled: !!user?.email,
//     });

//     return [donorRequestsId, refetch];
// };

// export default useDonorRequestWithId;