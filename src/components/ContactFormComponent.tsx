import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

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

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactFormComponent: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
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

  const contactPreference = watch('contactPreference');

  const onSubmit = async (data: ContactFormValues) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', data);
      alert('Form submitted successfully!');
      // Here you would typically send the data to your backend
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Contact with Our Team Members</h2>
        </div>

        {/* Contact channels */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="border-2 border-zinc-300 rounded-[5px] p-4 text-start gap-6 flex flex-col justify-between">
            <div className="flex justify-end">
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_528_540)">
                    <path d="M11.5 0C5.14878 0 0 5.14878 0 11.5C0 16.893 3.71312 21.4185 8.72206 22.6614V15.0144H6.35076V11.5H8.72206V9.98568C8.72206 6.07154 10.4935 4.2573 14.3364 4.2573C15.065 4.2573 16.3222 4.40036 16.8365 4.54296V7.72846C16.5651 7.69994 16.0936 7.68568 15.508 7.68568C13.6224 7.68568 12.8938 8.40006 12.8938 10.2571V11.5H16.6502L16.0048 15.0144H12.8938V22.9158C18.5881 22.2281 23.0005 17.3797 23.0005 11.5C23 5.14878 17.8512 0 11.5 0Z" fill="#070707"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_528_540">
                    <rect width="23" height="23" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
            </div>
            <p className="text-sm">Product showcases</p>
          </div>
          
          <div className="border-2 border-zinc-300 rounded-[5px] p-4 text-start gap-6 flex flex-col justify-between">
            <div className="flex justify-end">
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5629 1.82458H20.7958L13.7328 9.8971L22.0418 20.882H15.5359L10.4403 14.2197L4.6097 20.882H1.37483L8.92937 12.2475L0.958496 1.82458H7.62956L12.2356 7.91415L17.5629 1.82458ZM16.4282 18.9469H18.2196L6.65617 3.658H4.73381L16.4282 18.9469Z" fill="black"/>
                </svg>
            </div>
            <p className="text-sm">Product latest updates</p>
          </div>
          
          <div className="border-2 border-zinc-300 rounded-[5px] p-4 text-start gap-6 flex flex-col justify-between">
            <div className="flex justify-end">
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.9548 10.6601C16.8557 10.6126 16.7551 10.5669 16.6532 10.5231C16.4756 7.25197 14.6882 5.37924 11.6869 5.36008C11.6733 5.35999 11.6598 5.35999 11.6462 5.35999C9.85107 5.35999 8.35807 6.12625 7.43914 7.5206L9.08975 8.65289C9.77623 7.61136 10.8536 7.38932 11.647 7.38932C11.6562 7.38932 11.6654 7.38933 11.6744 7.38941C12.6627 7.39571 13.4084 7.68303 13.891 8.24334C14.2422 8.65127 14.4771 9.21497 14.5935 9.92639C13.7173 9.77748 12.7697 9.7317 11.7568 9.78977C8.90332 9.95414 7.06888 11.6183 7.19208 13.9308C7.2546 15.1038 7.83897 16.1129 8.83747 16.7722C9.68169 17.3294 10.769 17.6019 11.899 17.5403C13.3913 17.4584 14.5621 16.8891 15.3788 15.848C15.9991 15.0573 16.3914 14.0328 16.5646 12.7418C17.2758 13.171 17.8029 13.7358 18.094 14.4148C18.589 15.569 18.6179 17.4656 17.0703 19.0119C15.7143 20.3665 14.0845 20.9525 11.6212 20.9706C8.88888 20.9504 6.82243 20.0741 5.47888 18.3661C4.22076 16.7668 3.57055 14.4567 3.54629 11.5C3.57055 8.54328 4.22076 6.23319 5.47888 4.63387C6.82243 2.9259 8.88885 2.04964 11.6212 2.02933C14.3734 2.04979 16.4759 2.93027 17.8708 4.64648C18.5548 5.48809 19.0706 6.54647 19.4105 7.7805L21.3448 7.26443C20.9327 5.74547 20.2843 4.43657 19.4019 3.35105C17.6135 1.1508 14.998 0.0233771 11.628 0H11.6145C8.25128 0.0232959 5.66504 1.15501 3.9276 3.36367C2.38152 5.3291 1.58401 8.06386 1.55721 11.4919L1.55713 11.5L1.55721 11.5081C1.58401 14.9361 2.38152 17.6709 3.9276 19.6364C5.66504 21.845 8.25128 22.9768 11.6145 23H11.628C14.618 22.9793 16.7256 22.1964 18.4619 20.4617C20.7335 18.1923 20.6651 15.3476 19.9164 13.6013C19.3793 12.349 18.3552 11.3318 16.9548 10.6601ZM11.7922 15.5139C10.5416 15.5843 9.24229 15.023 9.17823 13.8206C9.13074 12.9291 9.81267 11.9344 11.8689 11.8159C12.1044 11.8023 12.3355 11.7956 12.5625 11.7956C13.3094 11.7956 14.0082 11.8682 14.6434 12.0071C14.4065 14.9662 13.0166 15.4467 11.7922 15.5139Z" fill="black"/>
                </svg>
            </div>
            <p className="text-sm">Short activities and events</p>
          </div>
          
          <div className="border-2 border-zinc-300 rounded-[5px] p-4 text-start gap-6 flex flex-col justify-between">
            <div className="flex justify-end">
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 23L1.6167 17.0938C0.619082 15.365 0.0948748 13.4052 0.0958331 11.3955C0.0987081 5.11271 5.21141 0 11.4933 0C14.5417 0.000958333 17.4033 1.18833 19.5557 3.34267C21.7072 5.497 22.8917 8.3605 22.8907 11.4061C22.8878 17.6899 17.7751 22.8026 11.4933 22.8026C9.58619 22.8016 7.7069 22.3234 6.04228 21.4149L0 23ZM6.32211 19.3516C7.92827 20.3052 9.4616 20.8763 11.4894 20.8773C16.7104 20.8773 20.9635 16.628 20.9664 11.4042C20.9683 6.16975 16.7353 1.92625 11.4971 1.92433C6.27228 1.92433 2.02208 6.17358 2.02016 11.3965C2.0192 13.5288 2.64404 15.1254 3.69341 16.7957L2.73604 20.2917L6.32211 19.3516ZM17.2346 14.1153C17.1637 13.9965 16.974 13.9255 16.6884 13.7828C16.4038 13.64 15.0036 12.9509 14.742 12.856C14.4813 12.7612 14.2916 12.7133 14.1009 12.9988C13.9111 13.2835 13.3649 13.9255 13.1991 14.1153C13.0333 14.305 12.8666 14.329 12.5819 14.1862C12.2973 14.0434 11.3792 13.7435 10.2915 12.7727C9.44531 12.0175 8.87319 11.085 8.7074 10.7995C8.54161 10.5148 8.69015 10.3605 8.83198 10.2187C8.9604 10.0912 9.1166 9.88617 9.2594 9.71942C9.4041 9.55458 9.45106 9.43575 9.5469 9.24504C9.64177 9.05529 9.59481 8.88854 9.52294 8.74575C9.45106 8.60392 8.88181 7.20187 8.64511 6.63167C8.41319 6.07679 8.1784 6.15154 8.00398 6.14292L7.45773 6.13333C7.26798 6.13333 6.9594 6.20425 6.69874 6.48983C6.43807 6.77542 5.70207 7.4635 5.70207 8.86554C5.70207 10.2676 6.72269 11.6217 6.86453 11.8115C7.00732 12.0012 8.87223 14.8781 11.729 16.1115C12.4085 16.4048 12.9394 16.5801 13.3524 16.7114C14.0348 16.928 14.6558 16.8973 15.1464 16.8245C15.6936 16.743 16.8312 16.1355 17.0688 15.4704C17.3065 14.8043 17.3065 14.2341 17.2346 14.1153Z" fill="#030303"/>
                </svg>
            </div>
            <p className="text-sm">Mostly active here!</p>
          </div>
        </div>

        <p className="mb-8">Any queries about our business.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
      </div>
    </section>
  );
};

export default ContactFormComponent;