'use client'

import { useState } from 'react'
import { Inter } from 'next/font/google'
import { ChevronDown, Home, Phone, MapPin } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export default function TherapistProfile() {
   
    const [visibleTestimonials, setVisibleTestimonials] = useState(2);
  const [isExpanded, setIsExpanded] = useState(false)

  const testimonials = [
    {
      text: "The guidance I received helped me manage my stress and live a more balanced life.",
      author: "Anonymous"
    },
    {
      text: "Therapy helped me build self-esteem and confidence that I never thought possible.",
      author: "Anonymous"
    },
    {
      text: "The sessions have given me tools to cope with anxiety, and I feel more in control of my life.",
      author: "Anonymous"
    },
    {
      text: "I was able to overcome my fear of social situations through the therapy sessions.",
      author: "Anonymous"
    },
    {
      text: "My relationship with my partner has greatly improved after working on communication skills.",
      author: "Anonymous"
    },
    {
      text: "I now feel more empowered to face the challenges in my life and take charge of my future.",
      author: "Anonymous"
    }
  ];

  const handleShowMore = () => {
    // Show 2 more testimonials when clicked
    setVisibleTestimonials(prevVisible => prevVisible + 2);
  };
  return (
    <main className={`min-h-screen bg-white p-4 md:p-6 ${inter.className}`}>
      <style jsx global>{`
        :root {
          --primary-blue: #3B82F6;
          --text-primary: #333333;
          --text-secondary: #666666;
          --background-light: #F0F7FF;
        }
        
        body {
          margin: 0;
          padding: 0;
          color: var(--text-primary);
        }
        
        .therapy-tag {
          border: 1px solid var(--primary-blue);
          color: var(--primary-blue);
          border-radius: 100px;
          padding: 8px 16px;
          font-size: 14px;
          transition: all 0.2s;
        }
        
        .therapy-tag:hover {
          background-color: var(--primary-blue);
          color: white;
        }
        
        .service-card {
          background-color: var(--background-light);
          border-radius: 12px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .testimonial-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
      `}</style>

      <div className="max-w-3xl mx-auto">
        {/* About Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">About me</h2>
          <p className="text-secondary-foreground mb-2">
            Hello, I'm Swetha, a licensed therapist dedicated to guiding individuals through
            life's challenges with empathy and expertise. With over 10 years of experience, I
            specialize in helping clients manage anxiety, depression, and relationship issues
            through personalized, evidence-based practices.
          </p>
          <button className="text-primary hover:underline">Read more</button>
        </section>

        {/* Credentials Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Credentials</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="text-primary">🎓</span>
              <div>
                <p className="font-medium">Ph.D. in Clinical Psychology</p>
                <p className="text-secondary-foreground">Harvard University</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-primary">🎓</span>
              <div>
                <p className="font-medium">M.A. in Counseling</p>
                <p className="text-secondary-foreground">University of California, Berkeley</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-primary">📋</span>
              <div>
                <p className="font-medium">Licensed Professional Counselor (LPC)</p>
                <p className="text-secondary-foreground">State of DEF</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-primary">📋</span>
              <div>
                <p className="font-medium">Certified Cognitive Behavioral Therapist (CBT)</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-primary">👥</span>
              <div>
                <p className="font-medium">Member, American Psychological Association (APA)</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-primary">⏱️</span>
              <div>
                <p className="font-medium">10+ years of experience in individual and group therapy</p>
              </div>
            </div>
          </div>
        </section>

        {/* Available on Section */}
        <section className="mb-8">
  <h2 className="text-2xl font-bold mb-4">Available on</h2>
  <div className="grid grid-cols-2 gap-4 max-w-xs">
    {/* Card 1: In-person */}
    <div className="flex flex-col items-center">
      <div className="service-card flex items-center justify-center w-20 h-20 bg-blue-100 rounded-lg shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-12 h-12 text-blue-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3l7 7v10a1 1 0 01-1 1H6a1 1 0 01-1-1V10l7-7z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 14h4m-2-2v4"
          />
        </svg>
      </div>
      <span className="mt-2 text-center font-medium">In-person</span>
    </div>

    {/* Card 2: Video/Voice Call */}
    <div className="flex flex-col items-center">
  <div className="service-card flex items-center justify-center w-20 h-20 bg-blue-100 rounded-lg shadow-md">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6 text-blue-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75a3 3 0 013-3h1.514a3 3 0 012.25.985l1.362 1.515a2.999 2.999 0 01-.179 4.21l-.902.901a12.045 12.045 0 005.379 5.379l.901-.902a3 3 0 014.21-.178l1.515 1.362a3 3 0 01.985 2.25V18.75a3 3 0 01-3 3H18a15.751 15.751 0 01-15.75-15.75v-1.5z"
      />
    </svg>
  </div>
  <span className="mt-2 text-center font-medium">Video/ Voice call</span>
</div>

  </div>
</section>


        {/* I offer therapy for Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">I offer therapy for</h2>
          <div className="flex flex-wrap gap-3">
            <button className="therapy-tag">Stress Management</button>
            <button className="therapy-tag">Relationship Skills</button>
            <button className="therapy-tag">Anxiety Reduction</button>
            <button className="therapy-tag">Depression Relief</button>
            <button className="therapy-tag">Behavioral</button>
            <button className="therapy-tag">Trauma Healing</button>
          </div>
        </section>

        {/* Location and Languages Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">I am from</h2>
            <div className="flex items-center gap-2 text-secondary-foreground">
              <MapPin className="w-5 h-5" />
              <span>Chennai, India</span>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Languages</h2>
            <p className="text-secondary-foreground">English, Hindi</p>
          </section>
        </div>

        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Client Testimonials</h2>
            <button 
              onClick={handleShowMore}
              className="flex items-center gap-2 text-secondary-foreground hover:text-primary"
            >
              Show more
              <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {testimonials.slice(0, visibleTestimonials).map((testimonial, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg relative">
                <img width="40" height="40" src="https://img.icons8.com/ultraviolet/40/quote-left.png" alt="quote-left"/>
                <p className="text-secondary-foreground mb-4 text-center relative z-10">
                  "{testimonial.text}"
                </p>
                <p className="font-medium text-center">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

