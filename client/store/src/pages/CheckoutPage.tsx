import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import CheckoutForm from '../components/organisms/CheckoutForm';
import { useEffect, useState } from 'react';
import { checkoutService } from '../services/checkout.service';
import Loader from '../components/atoms/Loader';
import type { ICheckout } from '../types/checkout.interface';
import { toast } from 'sonner';
import { handleError } from '../utils/helper';
import OrderSummaryCard from '../components/organisms/OrderSummaryCard';
import type { ICheckoutFormData } from '../components/organisms/CheckoutForm/schema';
import type { IOrder } from '../types/order.interface';
import { CheckCircle } from 'lucide-react';
import Text from '../components/atoms/Text';
import Button from '../components/atoms/Button';
import OrderDetailsCard from '../components/organisms/OrderDetailsCard';

const CheckoutPage = () => {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [session, setSession] = useState<ICheckout | null>(null);
    const [order, setOrder] = useState<IOrder | null>(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSession = async () => {
            if (searchParams.has('redirect')) {
                navigate(searchParams.get('redirect')!, { replace: true });
                return;
            }

            if (!id) {
                navigate(-1);
                return;
            }

            try {
                const data = await checkoutService.getSession(id);
                setSession(data);
            } catch (err) {
                toast.error(handleError(err, "Unknown Session"))
                navigate(-1);
            } finally {
                setLoading(false)
            }
        };

        fetchSession();
    }, [id, navigate]);

    const handleFormSubmit = async (data: ICheckoutFormData) => {
        if (!id) return;

        setProcessing(true);
        try {
            const order = await checkoutService.confirmCheckout({
                sessionId: id,
                email: data.email,
                address: {
                    fullName: data.fullName,
                    phone: data.phone,
                    addressLine1: data.address,
                    city: data.city,
                    state: data.state,
                    country: "India",
                    zipCode: data.zipCode,
                },
                paymentDetails: {
                    type: "card",
                    cardNumber: data.cardNumber
                }
            })

            searchParams.set("redirect", `/orders/${order.id}`);
            setSearchParams(searchParams, { replace: true });
            setOrder(order);
        } catch (error) {
            toast.error(handleError(error, "Failed to confirm checkout"))
        } finally {
            setProcessing(false);
        }
    };



    if (loading || processing) return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Loader size={50} />
            {processing && (
                <div>Checkout Processing please wait..</div>
            )}
        </div>
    );

    if (!session) return null;

    return (
        <section className="flex flex-col md:flex-row">
            {/* Left - Form */}
            <div className="w-full md:w-[60%] p-6 pb-20">
                {order ? (
                    <>
                        <div className="flex items-center gap-3 mb-4 text-green-600">
                            <CheckCircle size={32} />
                            <Text as="h1" size="3xl" variant="primary" className="font-bold text-inherit">Thank you for your order!</Text>
                        </div>

                        <div className="mb-4">
                            <Text as="span" className="text-sm text-muted-foreground">
                                Order ID:
                            </Text>
                            <Text as="span" className="ml-2 font-medium">
                                {order.orderId}
                            </Text>
                        </div>
                        
                        <Text variant="disabled" className="mb-8">
                            We’ve sent a confirmation email with your order details.
                        </Text>

                        <OrderDetailsCard
                            email={order.email}
                            address={order.shippingAddress}
                            paymentMethod={order.paymentMethod}
                        />
                        {/* CTA */}
                        <div className="mt-10 text-center">
                            <Button
                                onClick={() => navigate("/")}
                                className="cursor-pointer px-6 py-2 text-base"
                            >
                                Back to Home
                            </Button>
                        </div>
                    </>
                ) : (
                    <CheckoutForm onSubmit={handleFormSubmit} />
                )}
            </div>

            {/* Right - Product Info */}
            <div className="bg-surface w-full md:w-[45%] md:sticky md:top-0 self-start min-h-screen">
                <OrderSummaryCard items={session.items} totalAmount={session.totalAmount} />
            </div>
        </section>
    );
};

export default CheckoutPage;
