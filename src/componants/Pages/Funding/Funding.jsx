import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";


// TODO
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_PK);
// console.log(stripePromise)
const Funding = () => {
    return (
        <div className="p-36">
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Funding;