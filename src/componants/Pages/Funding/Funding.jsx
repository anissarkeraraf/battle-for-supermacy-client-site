import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


// TODO
const stripePromise = loadStripe('');
const Funding = () => {
    return (
        <div className="pt-20">
            <div>
                <Elements stripe={stripePromise}>

                </Elements>
            </div>
        </div>
    );
};

export default Funding;