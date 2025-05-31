import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/atoms/Loader";
import OrderSummaryCard from "../components/organisms/OrderSummaryCard";
import Text from "../components/atoms/Text";
import type { IOrder } from "../types/order.interface";
import OrderDetailsCard from "../components/organisms/OrderDetailsCard";
import { orderService } from "../services/order.service";
import GoBackWrapper from "../components/molecules/GoBackWrapper";


const ThankYouPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState<IOrder | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!id) return navigate("/");

            try {
                const data = await orderService.getOrderById(id);
                setOrder(data);
            } catch (error) {
                navigate("/");
            } finally {
                setLoading(false);
            }
            setLoading(false);
        };

        fetchOrder();
    }, [id, navigate]);

    if (loading)
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <Loader size={40} />
            </div>
        );

    if (!order) return null;

    return (
        <section className="flex flex-col md:flex-row">
            {/* Left - Form */}
            <div className="w-full md:w-[60%] p-6 pb-20">
                {/* Order ID */}
                <GoBackWrapper>
                    <div className="flex items-center gap-3">
                        <Text className="font-medium text-xl">Order: </Text>
                        <Text className="font-semibold text-xl">{order.orderId}</Text>
                    </div>
                </GoBackWrapper>

                <OrderDetailsCard
                    email={order.email}
                    address={order.shippingAddress}
                    paymentMethod={order.paymentMethod}
                />
            </div>


            {/* Right - Product Info */}
            <div className="bg-surface w-full md:w-[45%] md:sticky md:top-0 self-start min-h-screen">
                <OrderSummaryCard items={order.items} totalAmount={order.totalAmount} />
            </div>
        </section >
    );
};

export default ThankYouPage;
