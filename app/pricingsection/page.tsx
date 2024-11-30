'use client'

import { ArrowLeft, X } from 'lucide-react'
import { useState } from "react"
import { useRouter } from 'next/navigation';

export default function TherapySessions() {
  const [showBanner, setShowBanner] = useState(true)
  const [selectedDuration, setSelectedDuration] = useState('60 min'); // Default duration
  const router = useRouter(); 
  const therapyTypes = [
    {
      title: "Group Therapy",
      price: "3,200",
      features: [
        "Joint Evaluation",
        "Communication Exercises",
        "Conflict Resolution",
        "Goal Setting",
        "Follow up plan"
      ]
    },
    {
      title: "Individual Therapy",
      price: "4,700",
      features: [
        "Joint Evaluation",
        "Communication Exercises",
        "Conflict Resolution",
        "Goal Setting",
        "Follow up plan"
      ]
    },
    {
      title: "Couple Therapy",
      price: "5,200",
      features: [
        "Joint Evaluation",
        "Communication Exercises",
        "Conflict Resolution",
        "Goal Setting",
        "Follow up plan"
      ]
    }
  ]

  const handleBookSession = (therapy) => {

    router.push(`/bookingsection?price=${therapy.price}&type=${therapy.title}&duration=${selectedDuration}`); // Pass selected duration
  };

  const handleback = () => {
    router.push('/'); // Navigate to the previous page
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
            <ArrowLeft className="h-8 w-8 text-black" onClick={handleback} />
          </button>
          <h1 className="text-xl text-black font-semibold ml-2">Available sessions</h1>
        </div>

        {showBanner && (
          <div className="bg-blue-50 rounded-lg p-4 mb-8 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-5 w-5 text-blue-500 mr-2">ℹ️</div>
              <p className="text-sm text-blue-600">Click on the duration to see the pricing details</p>
            </div>
            <button 
              onClick={() => setShowBanner(false)}
              className="text-blue-500 hover:text-blue-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {therapyTypes.map((therapy, index) => (
            <div
              key={index}
              className="bg-blue-500 rounded-lg p-6 text-white flex flex-col"
            >
              <div className="mb-6">
                <div className="flex items-baseline mb-4">
                  <span className="text-2xl">₹</span>
                  <span className="text-4xl font-bold">{therapy.price}</span>
                  <span className="ml-2 text-sm opacity-80">/ session</span>
                </div>
                
                <div className="flex gap-2 mb-6">
                  {['45 min', '60 min', '90 min'].map((duration, i) => (
                    <button
                      key={i}
                      className={`px-3 py-1 rounded-full text-sm border border-white/30 
                        ${selectedDuration === duration ? 'bg-white/20' : 'hover:bg-white/10'}`}
                      onClick={() => setSelectedDuration(duration)} // Update selected duration
                    >
                      {duration}
                    </button>
                  ))}
                </div>

                <h3 className="text-xl font-semibold pb-4 border-b border-white/20">
                  {therapy.title}
                </h3>
              </div>

              <ul className="flex-grow space-y-4 mb-6">
                {therapy.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleBookSession(therapy)}
                className="w-full bg-white text-blue-500 rounded-md py-3 font-semibold hover:bg-white/90 transition-colors"
              >
                Proceed
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
