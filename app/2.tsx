'use client'

import React, { useState } from 'react'
import { ArrowLeft, Home, Phone, Video, MapPin, ChevronRight } from 'lucide-react'


type TimeSlot = { time: string; period: 'Morning' | 'Afternoon' | 'Evening' }

const timeSlots: Record<string, TimeSlot[]> = {
  Morning: [
    { time: '8:00 - 8:45 AM', period: 'Morning' },
    { time: '9:00 - 9:45 AM', period: 'Morning' },
    { time: '11:00 - 11:45 AM', period: 'Morning' },
  ],
  Afternoon: [
    { time: '12:00 - 12:45 PM', period: 'Afternoon' },
    { time: '2:00 - 2:45 PM', period: 'Afternoon' },
    { time: '3:00 - 3:45 PM', period: 'Afternoon' },
    { time: '4:00 - 4:45 PM', period: 'Afternoon' },
  ],
  Evening: [
    { time: '5:00 - 5:45 PM', period: 'Evening' },
    { time: '6:00 - 6:45 PM', period: 'Evening' },
    { time: '7:00 - 7:45 PM', period: 'Evening' },
    { time: '8:00 - 8:45 PM', period: 'Evening' },
  ],
}



const cn = (...classes: string[]) => classes.filter(Boolean).join(' ')

const Button = ({ children, onClick, className, disabled, variant }: any) => (
  <button
    onClick={onClick}
    className={cn(
      'py-2 px-4 rounded-md font-semibold text-sm transition-all',
      variant === 'ghost' ? 'bg-transparent text-gray-600' : 'bg-blue-500 text-white hover:bg-blue-400',
      className,
      disabled && 'bg-gray-200 cursor-not-allowed'
    )}
    disabled={disabled}
  >
    {children}
  </button>
)



const Calendar = ({ selected, onSelect, isDisabled }: any) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const availableDates = [5, 10, 15, 20] // Modify as needed

  const handleDateSelect = (day: number) => {
    if (!isDisabled) {
      const date = new Date(selectedDate?.getFullYear() || new Date().getFullYear(), selectedDate?.getMonth() || new Date().getMonth(), day)
      setSelectedDate(date)
      onSelect(date)
    }
  }

  const currentYear = selectedDate?.getFullYear() || new Date().getFullYear()
  const currentMonth = selectedDate?.getMonth() || new Date().getMonth()

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDay = new Date(currentYear, currentMonth, 1).getDay()

  const calendarGrid = []

  // Add empty cells to start the grid
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
    calendarGrid.push(null)
  }

  // Fill the grid with day numbers
  for (let day = 1; day <= daysInMonth; day++) {
    calendarGrid.push(day)
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg"> {/* Increased padding and max width */}
      <div className="flex items-center justify-between mb-6"> {/* Increased margin-bottom */}
        <span className="text-lg font-medium text-gray-600">Available date</span> {/* Increased text size */}
        <div className="flex items-center gap-3"> {/* Increased gap between items */}
          <span className="text-lg font-medium text-gray-800">
            {new Date(currentYear, currentMonth).toLocaleString('default', { year: 'numeric', month: 'short' })}
          </span>
          <ChevronRight className="h-6 w-6 text-gray-600" /> {/* Increased icon size */}
        </div>
      </div>
      <div className="grid grid-cols-7 gap-4 text-center text-sm font-medium text-gray-500"> {/* Increased gap between column items */}
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day} className="text-xs text-gray-400">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-4 mt-4"> {/* Increased gap and margin-top */}
        {calendarGrid.map((day, index) => (
          <div key={index} className="relative">
            {day ? (
              <button
                className={cn(
                  'w-full h-12 flex items-center justify-center text-lg font-semibold transition-all rounded-full', // Increased button height and text size
                  availableDates.includes(day)
                    ? isDisabled
                      ? 'text-gray-300 bg-gray-100 cursor-not-allowed'
                      : 'text-blue-500 hover:text-blue-400'
                    : isDisabled
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-500',
                  selected?.getDate() === day
                    ? 'bg-blue-500 text-white'
                    : ''
                )}
                onClick={() => handleDateSelect(day)}
                disabled={isDisabled || !availableDates.includes(day)}
              >
                {day}
              </button>
            ) : (
              <div className="h-12" /> 
            )}
          </div>
        ))}
      </div>
    </div>
  )
}




export default function BookingPage() {
  const [active, setActive] = useState('inPerson');
  const [selectedSlots, setSelectedSlots] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const handleSlotSelection = (time: string) => {
    setSelectedSlots((prev) => (prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]))
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <header className="mb-6">
        <Button variant="ghost" className="mb-4" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-center text-xl font-semibold">Select Therapy Mode</h1>
      </header>


      <div className="w-full max-w-sm mx-auto p-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
    {/* In-person Option */}
    <div
      className="flex flex-col items-center justify-center cursor-pointer group"
      onClick={() => setActive('inPerson')} // Set active to In-person when clicked
    >
      <div
        className={`p-6 rounded-lg mb-2 transition-all transform ${
          active === 'inPerson' ? 'bg-[#1e9fe5] scale-105' : ''
        }`} // Apply zoom effect with scale-105
      >
        <Home
          className={`h-6 w-6 transition-all duration-300 ${
            active === 'inPerson' ? 'text-white scale-110' : 'text-blue-500'
          }`} // Apply zoom effect to icon with scale-110
        />
      </div>
      <span
        className={`text-sm font-medium transition-all ${
          active === 'inPerson' ? 'text-[#1e9fe5] scale-110' : 'text-gray-600'
        }`} // Apply zoom effect to text with scale-110
      >
        In-person
      </span>
    </div>

    {/* Video Option */}
    <div
      className="flex flex-col items-center justify-center cursor-pointer group"
      onClick={() => setActive('video')} // Set active to Video when clicked
    >
      <div
        className={`p-6 rounded-lg mb-2 transition-all transform ${
          active === 'video' ? 'bg-[#1e9fe5] scale-105' : ''
        }`} // Apply zoom effect with scale-105
      >
        <Video
          className={`h-6 w-6 transition-all duration-300 ${
            active === 'video' ? 'text-white scale-110' : 'text-blue-500'
          }`} // Apply zoom effect to icon with scale-110
        />
      </div>
      <span
        className={`text-sm font-medium transition-all ${
          active === 'video' ? 'text-[#1e9fe5] scale-110' : 'text-gray-600'
        }`} // Apply zoom effect to text with scale-110
      >
        Video
      </span>
    </div>

    {/* Call Option */}
    <div
      className="flex flex-col items-center justify-center cursor-pointer group"
      onClick={() => setActive('call')} // Set active to Call when clicked
    >
      <div
        className={`p-6 rounded-lg mb-2 transition-all transform ${
          active === 'call' ? 'bg-[#1e9fe5] scale-105' : ''
        }`} // Apply zoom effect with scale-105
      >
        <Phone
          className={`h-6 w-6 transition-all duration-300 ${
            active === 'call' ? 'text-white scale-110' : 'text-blue-500'
          }`} // Apply zoom effect to icon with scale-110
        />
      </div>
      <span
        className={`text-sm font-medium transition-all ${
          active === 'call' ? 'text-[#1e9fe5] scale-110' : 'text-gray-600'
        }`} // Apply zoom effect to text with scale-110
      >
        Call
      </span>
    </div>
  </div>

  {/* Conditionally render the address if "In-person" is selected */}
  {active === 'inPerson' && (
    <div className="flex items-center gap-2 text-gray-600 pl-1">
      <MapPin className="h-5 w-5 flex-shrink-0" />
      <span className="text-sm">3rd Floor, A2, 3S, Block A2, Delhi</span>
    </div>
  )}
</div>







<section className="space-y-6">
  <div className="container mx-auto px-4">
    <h2 className="text-lg font-semibold">Select Slots</h2>

    {/* Grid layout for Morning, Afternoon, and Evening */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

      {/* Morning Slot */}
      <div>
        <h3 className="mb-3 text-sm text-gray-600">Morning</h3>
        <div className="flex flex-wrap gap-2">
          {timeSlots.Morning.map(({ time }) => (
           <Button
           key={time}
           variant="outline"
           className={cn(
             'border-2 text-black bg-transparent', // Default button style
             selectedSlots.includes(time) && 'bg-[#0085d0] text-white border-blue-500' // Selected button style with bg-blue-500
           )}
           onClick={() => handleSlotSelection(time)}
         >
           {time}
         </Button>
         
          
          ))}
        </div>
      </div>

      {/* Afternoon Slot */}
      <div>
        <h3 className="mb-3 text-sm text-gray-600">Afternoon</h3>
        <div className="flex flex-wrap gap-2">
          {timeSlots.Afternoon.map(({ time }) => (
            <Button
              key={time}
              variant="outline"
              className={cn(
                'border-2 text-black bg-transparent hover:bg-transparent', // Default button style
                selectedSlots.includes(time) && 'bg-[#1e9fe5] text-white border-[#1e9fe5]' // Selected button style
              )}
              onClick={() => handleSlotSelection(time)}
            >
              {time}
            </Button>
          ))}
        </div>
      </div>

      {/* Evening Slot */}
      <div>
        <h3 className="mb-3 text-sm text-gray-600">Evening</h3>
        <div className="flex flex-wrap gap-2">
          {timeSlots.Evening.map(({ time }) => (
            <Button
              key={time}
              variant="outline"
              className={cn(
                'border-2 text-black bg-transparent hover:bg-transparent', // Default button style
                selectedSlots.includes(time) && 'bg-[#1e9fe5] text-white border-[#1e9fe5]' // Selected button style
              )}
              onClick={() => handleSlotSelection(time)}
            >
              {time}
            </Button>
          ))}
        </div>
      </div>

    </div>

    <p className="text-sm text-gray-500">ℹ Select one or more slots to see their availability.</p>
  </div>
</section>


      
      <section className="mt-8">
        <h2 className="mb-4 text-lg font-semibold">Select Date</h2>
        <Calendar selected={selectedDate} onSelect={setSelectedDate} isDisabled={selectedSlots.length === 0} />
     
 
      </section>
    

      <div className="fixed bottom-0 left-0 mt-12 pt-12 right-0 bg-white p-4 flex justify-center">
  <Button 
    className="w-1/2" // Remove full width and let the button size adjust to content
    disabled={selectedSlots.length === 0 || !selectedDate}
  >
    Proceed
  </Button>
</div>
    </div>
  )
}
