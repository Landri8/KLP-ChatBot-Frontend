import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { getVerficationCodeApi, sendMessageApi, verifyEmailApi } from '../services/clientService';
import { httpResponseHandler } from '../utils/responseHandlerUtil';
import toast from 'react-hot-toast';
import ResponseModel from '../models/response.model';

// Define the validation schema with Zod
const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(6, 'Please enter a valid phone number'),
  companyName: z.string().min(1, 'Company name is required'),
  country: z.string().min(1, 'Please select a country'),
  jobTitle: z.string().min(1, 'Job title is required'),
  jobDetails: z.string().optional(),
  contactPreference: z.string().optional(),
});

// OTP validation schema
const otpSchema = z.object({
  otp: z.string().min(4, 'Please enter the verification code').max(6)
});

type ContactFormValues = z.infer<typeof contactFormSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

const ContactFormComponent: React.FC = () => {
  // Form stages
  const [formStage, setFormStage] = useState<'form' | 'verification' | 'success'>('form');
  const [isSubmittingOtp, setIsSubmittingOtp] = useState(false);
  const [isGettingOtp, setIsGettingOtp] = useState(false);
  const [formData, setFormData] = useState<ContactFormValues | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);

  // Main form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    getValues,
    reset,
    setValue
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      contactPreference: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      companyName: '',
      country: '',
      jobTitle: '',
      jobDetails: '',
    },
  });

  // OTP form
  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: otpErrors },
    setValue: setOtpValue,
    reset: resetOtp
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: ''
    }
  });

  const contactPreference = watch('contactPreference');
  const emailWatcher = watch('email');

  // Start OTP verification process
  const onSubmitForm = async (data: ContactFormValues) => {
    try {
      setFormData(data);
      await handleGetOTPCode();
      setFormStage('verification');
    } catch (error) {
      console.error('Error starting verification:', error);
      toast.error('Failed to start verification process');
    }
  };

  // Get OTP code
  const handleGetOTPCode = async () => {
    try {
      setIsGettingOtp(true);
      const email = getValues('email');
      
      // Call API to get OTP
      const {data: responseData} = await getVerficationCodeApi({email});
      const result = httpResponseHandler(responseData);
      
      if (result) {
        toast.success('Verification code sent to your email');
        setOtpSent(true);
        startResendCooldown();
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to send verification code');
    } finally {
      setIsGettingOtp(false);
    }
  };

  // Handle OTP verification
  const onVerifyOtp = async (data: OtpFormValues) => {
    try {
      setIsSubmittingOtp(true);
      
      if (!formData) {
        throw new Error('Form data is missing');
      }
      
      // Verify OTP
      const {data: responseData} = await verifyEmailApi({
        email: formData.email, 
        otp: data.otp
      });
      
      const result = httpResponseHandler(responseData);
      
      await submitContactForm();
    } catch (error: any) {
      toast.error(error?.message || 'Verification failed');
    } finally {
      setIsSubmittingOtp(false);
    }
  };

  // Submit the actual contact form
  const submitContactForm = async () => {
    try {
      if (!formData) return;
      const {data: responseData} : {data: ResponseModel} = await sendMessageApi({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.companyName,
        country: formData.country,
        jobTitle: formData.jobTitle,
        jobDetails: formData.jobDetails || ''
      });
      console.log(responseData);

      const sendMessageResponseData = httpResponseHandler(responseData);
      reset();
      setValue('phone', '+95 ');
      toast.success(responseData.message);
      
      // Show success message
      toast.success('Form submitted successfully!');
      setFormStage('success');
      
    } catch (error: any) {
      toast.error(error?.message || 'Failed to submit form');
      // Go back to form stage if submission fails
      setFormStage('form');
    }
  };

  // Start cooldown for resend button
  const startResendCooldown = () => {
    setResendDisabled(true);
    setCountdown(60);
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Go back to form
  const handleGoBack = () => {
    setFormStage('form');
    resetOtp();
  };

  return (
    <section className="pt-4 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Contact with Our Team Members</h2>
        </div>

        {formStage === 'form' && (
          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
            {/* Contact channel preference - hidden radio buttons */}
            <div className="hidden">
              <label className="block text-sm font-medium">Preferred contact channel</label>
              <div className="mt-1 flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="facebook"
                    {...register('contactPreference')}
                    className="h-4 w-4"
                  />
                  <span className="ml-2">Facebook</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="twitter"
                    {...register('contactPreference')}
                    className="h-4 w-4"
                  />
                  <span className="ml-2">Twitter</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="instagram"
                    {...register('contactPreference')}
                    className="h-4 w-4"
                  />
                  <span className="ml-2">Instagram</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="whatsapp"
                    {...register('contactPreference')}
                    className="h-4 w-4"
                  />
                  <span className="ml-2">WhatsApp</span>
                </label>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className={`w-full px-3 py-2 bg-white border rounded-md ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="First name"
                  {...register('firstName')}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className={`w-full px-3 py-2 bg-white border rounded-md ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Last name"
                  {...register('lastName')}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                className={`w-full px-3 py-2 bg-white border rounded-md ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="youremail@gmail.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone
              </label>
                  <PhoneInput
                  {...register("phone")}
                  className={`w-full ps-3 py-[2px] bg-white border rounded-md outline-none ${
                      errors.phone ? "border-red-300 bg-red-50" : "border-gray-200"
                  }`}
                  defaultCountry="mm"
                  value={""}
                  onChange={() => {}}
                  />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            {/* Company and Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium mb-1">
                  Company name
                </label>
                <input
                  id="companyName"
                  type="text"
                  className={`w-full px-3 py-2 bg-white border rounded-md ${
                    errors.companyName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g TCU"
                  {...register('companyName')}
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium mb-1">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  className={`w-full px-3 py-2 bg-white border rounded-md ${
                    errors.country ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g Myanmar"
                  {...register('country')}
                />
                {errors.country && (
                  <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
                )}
              </div>
            </div>

            {/* Job Title */}
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium mb-1">
                Job Title
              </label>
              <input
                id="jobTitle"
                type="text"
                className={`w-full px-3 py-2 bg-white border rounded-md ${
                  errors.jobTitle ? 'border-red-500' : 'border-gray-300'
                }`}
                {...register('jobTitle')}
              />
              {errors.jobTitle && (
                <p className="mt-1 text-sm text-red-600">{errors.jobTitle.message}</p>
              )}
            </div>

            {/* Job Details */}
            <div>
              <label htmlFor="jobDetails" className="block text-sm font-medium mb-1">
                Job Details
              </label>
              <textarea
                id="jobDetails"
                rows={5}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                {...register('jobDetails')}
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        )}

        {formStage === 'verification' && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-4">Email Verification</h3>
            <p className="mb-6">
              We've sent a verification code to <span className="font-medium">{formData?.email}</span>. 
              Please enter the code below to verify your email address.
            </p>
            
            <form onSubmit={handleSubmitOtp(onVerifyOtp)} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium mb-1">
                  Verification Code
                </label>
                <input
                  id="otp"
                  type="text"
                  className={`w-full px-3 py-2 bg-white border rounded-md ${
                    otpErrors.otp ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter verification code"
                  autoComplete="off"
                  autoFocus
                  {...registerOtp('otp')}
                />
                {otpErrors.otp && (
                  <p className="mt-1 text-sm text-red-600">{otpErrors.otp.message}</p>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800"
                  onClick={handleGetOTPCode}
                  disabled={resendDisabled || isGettingOtp}
                >
                  {resendDisabled 
                    ? `Resend code in ${countdown}s` 
                    : isGettingOtp 
                      ? 'Sending...' 
                      : 'Resend code'}
                </button>
                
                <button
                  type="button"
                  className="text-sm text-gray-600 hover:text-gray-800"
                  onClick={handleGoBack}
                  disabled={isSubmittingOtp}
                >
                  Go back
                </button>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmittingOtp}
                  className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmittingOtp ? 'Verifying...' : 'Verify & Submit'}
                </button>
              </div>
            </form>
          </div>
        )}

        {formStage === 'success' && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
            <p className="mb-6">
              Your message has been submitted successfully. Our team will get back to you soon.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900"
            >
              Submit Another Query
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactFormComponent;