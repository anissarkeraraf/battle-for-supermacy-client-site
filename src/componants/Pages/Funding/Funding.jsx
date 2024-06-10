import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import PaymentHistory from "./PaymentHistory";


// TODO
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_PK);
// console.log(stripePromise)
const Funding = () => {
    return (
        <div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
            <div>
                <PaymentHistory></PaymentHistory>
            </div>
        </div>
    );
};

export default Funding;