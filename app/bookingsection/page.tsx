'use client'

import React, { useState } from 'react'
import { ArrowLeft, Home, Phone, Video, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";


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

interface CalendarProps {
  selected: Date | undefined;
  onSelect: (date: Date) => void;
  isDisabled: boolean;
}


const Calendar: React.FC<CalendarProps>  = ({ selected, onSelect, isDisabled }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const availableDates = [5, 10, 15, 20, 25] // Modify as needed

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
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6"> {/* Increased width */}
      <div className="flex items-center justify-between mb-6">
        {/* Available Dates and the color indicator */}
        <div className="text-lg font-medium text-gray-600">
          <div className="mb-2">
            Available Dates:
            <span className="ml-2 inline-block w-3 h-3 rounded-sm bg-blue-500"></span>
          </div>
          
        </div>
        
        {/* Month/Year on the right */}
        <div className="text-lg font-medium text-gray-600">
          {new Date(currentYear, currentMonth).toLocaleString('default', { year: 'numeric', month: 'long' })}
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-4 text-center text-sm font-medium text-gray-500 mb-4">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day} className="text-xs text-gray-400">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-4">
        {calendarGrid.map((day, index) => (
          <div key={index} className="relative">
            {day ? (
              <button
                className={cn(
                  'w-full h-12 flex items-center justify-center text-lg font-semibold transition-all rounded-full',
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
 
  const searchParams = useSearchParams();
const selectedprice = searchParams.get("price");



interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  variant?: 'ghost' | 'outline';  // Specify your variants
}

  const Button:React.FC<ButtonProps> = ({ children, onClick, className, disabled, style, variant }) => {
    const isGhostVariant = variant === 'ghost'; // Check if the variant is 'ghost'
  
    return (
      <button
        onClick={onClick}
        className={cn(
          'py-2 px-4 rounded-2xl font-semibold text-sm transition-all', // Updated to rounded-lg
          !isGhostVariant && 'border-2 border-black text-black', // Apply border if not ghost
          isGhostVariant && 'text-black bg-transparent border-none', // Ghost button should not have border or background
          className,
          disabled && 'bg-gray-200 cursor-not-allowed'
        )}
        style={style}
        disabled={disabled}
      >
        {children}
      </button>
    );
  };

  const router = useRouter();
  const [active, setActive] = useState('inPerson');
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [therapyMode, setTherapyMode] = useState<string>(''); // Track selected therapy mode

  const handleSlotSelection = (time: string) => {
    setSelectedSlots((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleback = () => {
    router.push('/pricingsection');
  };
 

  // Determine if all fields are selected
  const isFormValid = active && selectedSlots.length > 0 && selectedDate;

  return (
    <div className="min-h-screen bg-white p-6 text-black">
      {/* Header */}
      <header className="mb-8">
        <Button variant="ghost" className="mb-4" size="sm" onClick={handleback}>
          <ArrowLeft className="mr-2 h-8 w-8" />
        </Button>
        <h1 className="text-center text-xl font-semibold">Select Therapy Mode</h1>
      </header>

      {/* In-person, Video, Call Selection */}
      <div className="w-full max-w-sm mx-auto p-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center justify-center cursor-pointer group" onClick={() => { setActive('inPerson'); setTherapyMode('inPerson'); }}>
            <div className={`p-6 rounded-lg mb-2 transition-all transform ${active === 'inPerson' ? 'bg-[#1e9fe5] scale-105' : ''}`}>
              <Home className={`h-6 w-6 transition-all duration-300 ${active === 'inPerson' ? 'text-white scale-110' : 'text-blue-500'}`} />
            </div>
            <span className={`text-sm font-medium transition-all ${active === 'inPerson' ? 'text-[#1e9fe5] scale-110' : 'text-gray-600'}`}>
              In-person
            </span>
          </div>

          <div className="flex flex-col items-center justify-center cursor-pointer group" onClick={() => { setActive('video'); setTherapyMode('video'); }}>
            <div className={`p-6 rounded-lg mb-2 transition-all transform ${active === 'video' ? 'bg-[#1e9fe5] scale-105' : ''}`}>
              <Video className={`h-6 w-6 transition-all duration-300 ${active === 'video' ? 'text-white scale-110' : 'text-blue-500'}`} />
            </div>
            <span className={`text-sm font-medium transition-all ${active === 'video' ? 'text-[#1e9fe5] scale-110' : 'text-gray-600'}`}>
              Video
            </span>
          </div>

          <div className="flex flex-col items-center justify-center cursor-pointer group" onClick={() => { setActive('call'); setTherapyMode('call'); }}>
            <div className={`p-6 rounded-lg mb-2 transition-all transform ${active === 'call' ? 'bg-[#1e9fe5] scale-105' : ''}`}>
              <Phone className={`h-6 w-6 transition-all duration-300 ${active === 'call' ? 'text-white scale-110' : 'text-blue-500'}`} />
            </div>
            <span className={`text-sm font-medium transition-all ${active === 'call' ? 'text-[#1e9fe5] scale-110' : 'text-gray-600'}`}>
              Call
            </span>
          </div>
        </div>

        {active === 'inPerson' && (
          <div className="flex items-center mt-4 gap-2 text-gray-600 pl-1">
            <MapPin className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm">3rd Floor, A2, 3S, Block A2, Delhi</span>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 mb-8">
      <h2 className="mb-4 text-lg font-semibold">Filter by</h2>
        <div className="flex gap-4 justify-center">
          <Button className="rounded-full w-40 bg-black text-white hover:bg-black/90">Slots</Button>
          <Button variant="outline" className="rounded-full w-40">Date</Button>
        </div>
      </div>

      {/* Select Slots Section */}
      <div className="space-y-8">
        <section className="container mx-auto px-4 mb-8">
          <h2 className="text-lg mb-3 font-semibold">Select Slots</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <h3 className="mb-3 text-sm text-gray-600">Morning</h3>
              <div className="flex flex-wrap gap-2">
                {timeSlots.Morning.map(({ time }) => (
                  <Button
                    key={time}
                    variant="outline"
                    onClick={() => handleSlotSelection(time)}
                    style={{
                      color: selectedSlots.includes(time) ? 'white' : 'black',
                      backgroundColor: selectedSlots.includes(time) ? '#1e9fe5' : 'transparent',
                      borderColor: selectedSlots.includes(time) ? '#1e9fe5' : 'black',
                    }}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm text-gray-600">Afternoon</h3>
              <div className="flex flex-wrap gap-2">
                {timeSlots.Afternoon.map(({ time }) => (
                  <Button
                    key={time}
                    variant="outline"
                    onClick={() => handleSlotSelection(time)}
                    style={{
                      color: selectedSlots.includes(time) ? 'white' : 'black',
                      backgroundColor: selectedSlots.includes(time) ? '#1e9fe5' : 'transparent',
                      borderColor: selectedSlots.includes(time) ? '#1e9fe5' : 'black',
                    }}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm text-gray-600">Evening</h3>
              <div className="flex flex-wrap gap-2">
                {timeSlots.Evening.map(({ time }) => (
                  <Button
                    key={time}
                    variant="outline"
                    onClick={() => handleSlotSelection(time)}
                    style={{
                      color: selectedSlots.includes(time) ? 'white' : 'black',
                      backgroundColor: selectedSlots.includes(time) ? '#1e9fe5' : 'transparent',
                      borderColor: selectedSlots.includes(time) ? '#1e9fe5' : 'black',
                    }}
                  >
                    {time}
                  </Button>
                ))}
              </div>
             
            </div>
         
          </div>
          <p className="text-sm mt-4 text-gray-500">ℹ. Please select one or more slots to see when the slot or slots are next available.</p>
        </section>

        {/* Calendar Section */}
        <section className="mt-8 mb-8">

          <Calendar selected={selectedDate} onSelect={setSelectedDate} isDisabled={selectedSlots.length === 0} />
        </section>
      </div>

      {/* Proceed Button */}
      <div className="bottom-0 left-0 right-0 bg-white p-4 flex justify-center mt-8">
      <Button
  className="w-1/2"
  variant="ghost"
  disabled={!isFormValid}
  style={{
    backgroundColor: isFormValid ? '#1e9fe5' : '#c7d9e3',
    borderColor: isFormValid ? '#1e9fe5' : '#c7d9e3',
  }}
  onClick={() => {
    const query = new URLSearchParams({
      slots: selectedSlots.join(','),
      date: selectedDate?.toISOString() || '',
      price:selectedprice
    }).toString();
    router.push(`/bookingform?${query}`);
  }}
>
  Proceed 
</Button>

      </div>
    </div>
  );
}


