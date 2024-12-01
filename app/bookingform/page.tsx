'use client';

import { ArrowLeft, Calendar, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import queryString from "query-string";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
}

const BookingForm = () => {
  const router = useRouter();

  const [queryParams, setQueryParams] = useState<queryString.ParsedQuery<string>>({});
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEmployed, setIsEmployed] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
  });

  const availableDates = [
    "2024-12-05",
    "2024-12-10",
    "2024-12-15",
    "2024-12-20",
  ].map((date) => new Date(date));

  useEffect(() => {
    const params = queryString.parse(window.location.search);
    setQueryParams(params);

    if (params.date) {
      setSelectedDate(new Date(params.date as string));
    }
    if (params.slots) {
      setSelectedSlots((params.slots as string).split(","));
    }
    if (params.price) {
      setSelectedPrice(params.price as string);
    }
  }, []);

  const handleBack = () => {
    router.push("/bookingsection");
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" })); // Clear errors on input
  };

  const validateForm = (): Partial<Record<keyof FormData, string>> => {
    const errors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.firstName) errors.firstName = "First Name is required.";
    if (!formData.lastName) errors.lastName = "Last Name is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Valid email is required.";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone))
      errors.phone = "Enter a valid 10-digit phone number.";
    if (isEmployed && !formData.companyName)
      errors.companyName = "Company Name is required.";
    return errors;
  };

  const handleSubmit = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      router.push(`/confirm?email=${encodeURIComponent(formData.email)}`);
      console.log("Form submitted:", formData, selectedDate, selectedSlots);
    }
  };

  const isDateAvailable = (date: Date) =>
    availableDates.some(
      (availableDate) => availableDate.toDateString() === date.toDateString()
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <Suspense fallback={<div>Loading form...</div>} >
        <div className="max-w-xl w-full">
          <button
            className="absolute top-4 left-4 p-2 hover:bg-gray-100 text-black rounded-full"
            onClick={handleBack}
          >
            <ArrowLeft className="h-8 w-8" />
          </button>
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="bg-[#52A5E5] text-white p-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 mb-4 hover:bg-white/10 px-3 py-2 rounded-lg"
              >
                <Calendar className="h-5 w-5" />
                <span>Change date</span>
              </button>
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </h2>
                <p className="opacity-90">{selectedSlots.join(", ")}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold">{selectedPrice}/-</span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-black"
                  />
                  {formErrors.firstName && (
                    <p className="text-red-500 text-sm">{formErrors.firstName}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-black"
                  />
                  {formErrors.lastName && (
                    <p className="text-red-500 text-sm">{formErrors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-black"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm">{formErrors.email}</p>
                )}
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <img
                    src="https://flagcdn.com/w20/in.png"
                    alt="India flag"
                    className="w-5"
                  />
                  <span className="text-gray-500">+91</span>
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="9000 000000"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-24 rounded-lg border border-gray-300 text-black"
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm">{formErrors.phone}</p>
                )}
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-medium mb-4">
                  Have you been referred by your employer?
                </h3>
                <div className="flex gap-4 items-start">
                  <button
                    onClick={() => setIsEmployed(!isEmployed)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
                      isEmployed
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <span className="h-4 w-4 border-2 rounded-sm flex items-center justify-center">
                      {isEmployed && "✓"}
                    </span>
                    Yes, I am employed under
                    <br />a partnering company
                  </button>

                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      name="companyName"
                      placeholder="Company Name"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-black"
                      disabled={!isEmployed}
                    />
                    {formErrors.companyName && (
                      <p className="text-red-500 text-sm">
                        {formErrors.companyName}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-gray-300 text-gray-700 rounded-lg mt-8 font-medium hover:bg-gray-400 transition-colors"
              >
                Book session
              </button>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
              <ReactCalendar
                onChange={handleDateChange}
                value={selectedDate}
                minDate={new Date()}
                tileDisabled={({ date }) => !isDateAvailable(date)}
              />
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default BookingForm;
