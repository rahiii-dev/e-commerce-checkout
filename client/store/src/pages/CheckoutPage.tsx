import { useNavigate, useParams } from 'react-router-dom';
import CheckoutForm from '../components/organisms/CheckoutForm';
import CheckoutPageLayout from '../components/templates/CheckoutPageLayout';
import { useEffect, useState } from 'react';
import { checkoutService } from '../services/checkout.service';
import Loader from '../components/atoms/Loader';
import type { ICheckout } from '../types/checkout.interface';
import CheckoutItemCard from '../components/molecules/CheckoutItemCard';
import { toast } from 'sonner';
import { handleError } from '../utils/helper';

const CheckoutPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [session, setSession] = useState<ICheckout | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
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



    if (loading) return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Loader size={50} />
        </div>
    );

    if (!session) return null;

    return (
        <CheckoutPageLayout>
            <section className="flex flex-col md:flex-row">
                {/* Left - Form */}
                <div className="w-full md:w-[60%] p-6 pb-20">
                    <CheckoutForm />
                </div>

                {/* Right - Product Info */}
                <div className="bg-surface p-6 w-full md:w-[45%] md:sticky md:top-0 self-start min-h-screen">
                    <h1 className="text-xl font-semibold mb-4">Order Summary</h1>
                    <div className="space-y-4">
                        {session.items.map((item, idx) => (
                            <CheckoutItemCard item={item} key={idx} />
                        ))}
                    </div>

                    <div className="mt-6 text-lg font-bold flex justify-between">
                        <span>Total:</span>
                        <span>₹{session.totalAmount.toFixed(2)}</span>
                    </div>
                </div>
            </section>
        </CheckoutPageLayout>
    );
};

export default CheckoutPage;
