import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const {loginUser} = useAuth();
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        loginUser(email, password)
            .then(result => {
                console.log(result.user)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successfull",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                required
                                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-slate-600 text-white py-2 rounded  transition duration-200"
                        >
                            Login
                        </button>
                    </form>
                    <p className="mt-4 text-sm text-center">
                        Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Register here</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;