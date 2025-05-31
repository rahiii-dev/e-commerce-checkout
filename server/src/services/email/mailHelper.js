import transporter from "./transporter.js";

const from = `"Store App" <no-reply@storeapp.com>`;
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

export const sendApprovedEmail = async (data) => {
  const mailOptions = {
    from,
    to: data.email,               
    subject: `Order Confirmed — #${data.orderId}`,
    template: "orderApproved",                  
    context: {
      viewOrderUrl: `${clientOrigin}/orders/${data.id}`,       
      customerName: data.name,
      orderId: data.orderId,
      items: data.items,                  
      totalAmount: data.totalAmount,
      shipping: data.shippingAddress,       
    },
  };

  return transporter.sendMail(mailOptions);
};

export const sendDeclinedEmail = async (data) => {
  const mailOptions = {
    from,
    to: data.email,
    subject: `Payment Failed`,
    template: "orderDeclined",
    context: {
      viewCheckoutUrl: `${clientOrigin}/checkout/${data.id}`,       
      customerName: data.name,
      failureReason: data.failureReason,
      items: data.items,   
    },
  };

  return transporter.sendMail(mailOptions);
};
