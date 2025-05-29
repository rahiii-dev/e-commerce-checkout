import { z } from "zod";

export const checkoutFormSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().regex(/^\d{5,6}$/, "Invalid ZIP code"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format")
    .refine((val) => {
      const [mm, yy] = val.split("/").map(Number);
      if (isNaN(mm) || isNaN(yy)) return false;
      const expiry = new Date(2000 + yy, mm); 
      const now = new Date();
      return expiry > now;
    }, "Expiry must be a future date"),
  cvv: z.string().regex(/^\d{3}$/, "CVV must be 3 digits"),
});
