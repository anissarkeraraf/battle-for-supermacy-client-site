import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useDonors from "../../Hooks/useDonors";


const PaymentHistory = () => {
    const { user } = useAuth();
    const [donor] = useDonors();
    console.log(user?.email)
    const axiosSecure = useAxiosSecure();


    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data;
        }
    })

    return (
        <div className="mt-20 bg-gray-100 min-w-full rounded-lg p-5 md:p-20">
            <h2 className="text-3xl mb-5">Total Payment: {payments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-yellow-700 text-white">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>email</th>
                            <th>Date</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, index) =>
                                <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td>{payment.name}</td>
                                <td>{payment.email}</td>
                                <td>{payment.date}</td>
                                <td>${payment.price}</td>
                              </tr> )
                        }
                       
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;