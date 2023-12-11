import axios from "axios";
import { backendApiUrl } from "../constant";
import { User } from "@prisma/client";

export async function handleCheckout(
  body: { serviceId: string; quantity: number },
  user: Partial<User>
) {
  const { order } = (
    await axios.post(`${backendApiUrl}/payment/checkout`, body)
  ).data;

  const options = {
    key: "rzp_test_vRsxpClKcHbbVL", // Enter the Key ID generated from the Dashboard
    amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "USD",
    name: "Acme Corp",
    description: "learn coding by faisal khan",
    image: "https://example.com/your_logo",
    order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    callback_url: `${backendApiUrl}/payment/verify`,
    prefill: {
      name: user.name,
      email: user.email,
      contact: user.phone,
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };
  // @ts-ignore
  const razorpay = new window.Razorpay(options);

  razorpay.open();
}
