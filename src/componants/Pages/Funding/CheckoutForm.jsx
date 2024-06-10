import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useDonors from "../../Hooks/useDonors";
import Swal from "sweetalert2";

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [donor] = useDonors();
    const axiosSecure = useAxiosSecure();
    const [amount, setAmount] = useState('');
    const [transactionId, setTransactionId] = useState('');

    useEffect(() => {
        if (amount) {
            axiosSecure.post('/create-payment-intent', { price: parseFloat(amount) })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
                .catch(error => {
                    console.error('Error creating payment intent:', error);
                });
        }
    }, [axiosSecure, amount]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('Payment method error:', error);
            setError(error.message);
        } else {
            console.log('Payment method:', paymentMethod);
            setError('');
        }

        // Confirm Payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: donor[0]?.email || 'anonymous',
                    name: donor[0]?.name || 'anonymous',
                },
            },
        });

        if (confirmError) {
            console.log('Confirm error:', confirmError);
            setError(confirmError.message);
        } else {
            console.log('Payment intent:', paymentIntent);
            if(paymentIntent.status === 'succeeded'){
                console.log('Transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id)
            }
        }

        // Now payment save the database
        const payment = {
            email: donor[0]?.email,
            price: amount,
            name: donor[0]?.name,
            date: new Date()
        }

        const res = await axiosSecure.post('/payments', payment);
        console.log('payment save',res);
        if(res.data?.insertedId){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Thanks for fund",
                showConfirmButton: false,
                timer: 1500
              });
        }
    };

    return (
        <form onSubmit={handleSubmit} className=" p-10 lg:px-36">
            <div className="mb-12">
                <div className="mb-2">
                    <label>
                        <span>Amount:</span>
                    </label>
                </div>
                <div>
                    <input
                        className="input input-bordered w-full max-w-xs"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter your amount"
                        required
                    />
                </div>
            </div>

            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div className="mt-5">
                <button className="bg-[#F99141] btn-sm btn-outline rounded" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </div>
            <p className="text-red-600">{error}</p>
            {
                transactionId && <p className="text-green-600"> Your Transaction Id: {transactionId}</p>
            }
        </form>
    );
};

export default CheckoutForm;
