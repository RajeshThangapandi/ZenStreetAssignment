"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookingConfirmation() {
  const searchParams = useSearchParams();  // Use searchParams hook to access query params
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const emailFromQuery = searchParams.get("email");  // Try to get email from query
    console.log("Email from query:", emailFromQuery);  // Debugging step
    if (emailFromQuery) {
      setEmail(emailFromQuery);  // Set email if it's found
    }
  }, [searchParams]);  // Depend on searchParams to ensure it updates after page load

  // If email is not found yet, show "Loading..."
  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <div className="w-full max-w-xl mx-auto text-center space-y-6">
        <h1 className="text-[32px] font-bold text-gray-900">
          Booking Confirmed!
        </h1>

        <p className="text-gray-600 text-[15px] leading-relaxed max-w-md mx-auto">
          Congratulations! Your therapy session has been successfully scheduled. We're looking forward to helping you on your journey to better mental health.
        </p>

        <div className="pt-4 space-y-4">
          <div className="text-left">
            <p className="text-[15px] italic text-gray-700 mb-3">
              i. Instructions
            </p>
            <ul className="space-y-3 text-[15px] text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  A confirmation email with all the session details has been sent to{" "}
                  <span className="text-[#3B82F6]">{email}</span>
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  If this is your first session, consider jotting down any key points or questions you want to discuss.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6">
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-[#3B82F6] text-white rounded-md py-3 px-4 text-[15px] font-medium hover:bg-blue-600 transition-colors"
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
