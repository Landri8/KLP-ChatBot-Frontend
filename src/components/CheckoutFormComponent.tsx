import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Define validation schema with Zod
const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  country: z.string().min(1, "Country is required"),
  termsAndConditions: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
  cardNumber: z
    .string()
    .min(1, "Card number is required")
    .regex(
      /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/,
      "Card number must be in format XXXX XXXX XXXX XXXX"
    ),
  expiration: z
    .string()
    .min(1, "Expiration date is required")
    .regex(
      /^(0[1-9]|1[0-2])\s?\/\s?[0-9]{2}$/,
      "Expiration date must be in format MM/YY"
    ),
  cvc: z
    .string()
    .min(1, "CVC is required")
    .regex(/^[0-9]{3,4}$/, "CVC must be 3 or 4 digits"),
  cardCountry: z.string().min(1, "Card country is required"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const CheckoutFormComponent: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "South Africa",
      termsAndConditions: true,
      cardNumber: "",
      expiration: "",
      cvc: "",
      cardCountry: "South Africa",
    },
  });

  const navigator = useNavigate();

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
        toast.loading("Purchasing...");
        await new Promise((resolve) => setTimeout(resolve, 3000));
        toast.remove();
        toast.success("Successfully Purchased!");
        navigator("/products");
    } catch (error) {
        console.error("Submission error:", error);
    }
  };

  // Order summary data
  const orderSummary = {
    product: "TCU-28 Indoor Camera",
    price: 999.98,
    subtotal: 999.69,
    vat: 1.3,
    total: 999.98,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="my-24"></div>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row">
          {/* Left Column - Billing Details */}
          <div className="lg:w-3/5 lg:pr-12 mb-8 lg:mb-0">
            <h2 className="text-xl font-semibold mb-6">Details</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    className={`w-full p-3 border rounded-md ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className={`w-full p-3 border rounded-md ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className={`w-full p-3 border rounded-md ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Country */}
              <div className="mb-4">
                <select
                  className={`w-full p-3 border rounded-md appearance-none bg-white ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("country")}
                >
                  <option value="South Africa">South Africa</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
                {errors.country && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.country.message}
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className={`mr-2 h-4 w-4 ${
                      errors.termsAndConditions ? "border-red-500" : ""
                    }`}
                    {...register("termsAndConditions")}
                  />
                  <span className="text-sm">Terms & Conditions</span>
                </label>
                {errors.termsAndConditions && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.termsAndConditions.message}
                  </p>
                )}
              </div>

              {/* Card Details */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Card number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="1234 1234 1234 1234"
                    className={`w-full p-3 border rounded-md ${
                      errors.cardNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("cardNumber")}
                  />
                  <div className="absolute right-2 top-3 flex space-x-1">
                    <img src="/assets/visa.png" alt="Visa" className="h-6" />
                    <img
                      src="/assets/master.png"
                      alt="Mastercard"
                      className="h-6"
                    />
                  </div>
                </div>
                {errors.cardNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>

              {/* Expiration and CVC */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Expiration
                  </label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className={`w-full p-3 border rounded-md ${
                      errors.expiration ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("expiration")}
                  />
                  {errors.expiration && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.expiration.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">CVC</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="CVC"
                      className={`w-full p-3 border rounded-md ${
                        errors.cvc ? "border-red-500" : "border-gray-300"
                      }`}
                      {...register("cvc")}
                    />
                  </div>
                  {errors.cvc && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.cvc.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Card Country */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">
                  Country
                </label>
                <select
                  className={`w-full p-3 border rounded-md appearance-none bg-white ${
                    errors.cardCountry ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("cardCountry")}
                >
                  <option value="South Africa">South Africa</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
                {errors.cardCountry && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.cardCountry.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-zinc-800 text-white py-3 px-4 rounded-md hover:bg-zinc-800"
              >
                Complete order ${orderSummary.total.toFixed(2)}
              </button>
            </form>

            {/* Security Badge */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center text-sm text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Guaranteed safe & secure checkout
                <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">
                  Powered by AI Solution
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-2/5 bg-white p-6 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Order summary</h2>

            {/* Product Item */}
            <div className="flex items-center justify-between py-4 border-b">
              <div className="flex items-center">
                <span>{orderSummary.product}</span>
              </div>
              <span>${orderSummary.price.toFixed(2)}</span>
            </div>

            {/* Coupon Code */}
            <div className="py-4 border-b">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="flex-grow p-2 border rounded-l-md border-gray-300 focus:outline-none"
                />
                <button
                  type="button"
                  className="bg-white text-indigo-600 px-4 py-2 border border-l-0 rounded-r-md border-gray-300 hover:bg-gray-50"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Order Totals */}
            <div className="py-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${orderSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>VAT (15% incl.)</span>
                <span>${orderSummary.vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${orderSummary.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFormComponent;
