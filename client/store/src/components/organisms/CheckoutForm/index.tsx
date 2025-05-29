import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../../molecules/FormField";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { checkoutFormSchema } from "./schema";
import { useEffect } from "react";

type FormData = z.infer<typeof checkoutFormSchema>;

const STORAGE_KEY = "checkout-form-data";

const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(checkoutFormSchema),
  });


  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      reset(JSON.parse(stored));
    }
  }, [reset]);


  const watchedValues = watch();
  useEffect(() => {
    const { cardNumber, cvv, expiryDate, ...rest } = watchedValues;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
  }, [watchedValues]);

  const onSubmit = (data: FormData) => {
    console.log("Submit checkout", data);
    // Clear stored form data after successful checkout (optional)
    // sessionStorage.removeItem(STORAGE_KEY);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Shipping Details</h3>

        <FormField label="Full Name" error={errors.fullName?.message}>
          <Input {...register("fullName")} />
        </FormField>

        <FormField label="Email" error={errors.email?.message}>
          <Input {...register("email")} type="email" />
        </FormField>

        <FormField label="Phone Number" error={errors.phone?.message}>
          <Input {...register("phone")} />
        </FormField>

        <FormField label="Address" error={errors.address?.message}>
          <Input {...register("address")} />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="City" error={errors.city?.message}>
            <Input {...register("city")} />
          </FormField>

          <FormField label="State" error={errors.state?.message}>
            <Input {...register("state")} />
          </FormField>

          <FormField label="ZIP Code" error={errors.zipCode?.message}>
            <Input {...register("zipCode")} />
          </FormField>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment Details</h3>

        <FormField label="Card Number" error={errors.cardNumber?.message}>
          <Input {...register("cardNumber")} />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Expiry Date (MM/YY)" error={errors.expiryDate?.message}>
            <Input {...register("expiryDate")} placeholder="MM/YY" />
          </FormField>

          <FormField label="CVV" error={errors.cvv?.message}>
            <Input {...register("cvv")} />
          </FormField>
        </div>
      </div>

      <Button type="submit" className="w-full mt-4 cursor-pointer">
        Pay Now
      </Button>
    </form>
  );
};

export default CheckoutForm;
