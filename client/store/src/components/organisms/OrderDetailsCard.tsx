import type { IAddress } from "../../types/order.interface";
import Text from "../atoms/Text";

interface OrderDetailsCardProps {
    email: string;
    paymentMethod: string;
    address: IAddress;
}

const OrderDetailsCard = ({email, paymentMethod, address}: OrderDetailsCardProps) => {
    return (
        <div className="border-2 border-surface p-6 rounded-lg space-y-6">
            {/* Contact */}
            <div className="space-y-1">
                <Text className="text-sm font-medium">Contact Information</Text>
                <Text className="font-semibold">{email}</Text>
            </div>

            {/* Payment Method */}
            <div className="space-y-1">
                <Text className="text-sm font-medium">Payment Method</Text>
                <Text className="font-semibold capitalize">{paymentMethod}</Text>
            </div>

            {/* Shipping Address */}
            <div className="space-y-1">
                <Text className="text-sm font-medium">Shipping Address</Text>
                <div className="ml-1 text-sm leading-relaxed space-y-0.5">
                    <Text>{address.fullName}</Text>
                    <Text>{address.addressLine1}</Text>
                    <Text>
                        {address.city}, {address.state} - {address.zipCode}
                    </Text>
                    <Text>{address.country}</Text>
                    <Text>Phone: {address.phone}</Text>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailsCard;
