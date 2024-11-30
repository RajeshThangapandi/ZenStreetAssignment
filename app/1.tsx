import { Badge } from "./components/badge"
import { Button } from "./components/button"
import { Card } from "./components/card"
import { ArrowLeft, CheckCircle, Home, MapPin, Phone, Share2 } from 'lucide-react'
import Image from "next/image"

export default function TherapistProfile() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-500 p-4 text-white">
        <Button variant="ghost" className="text-white hover:text-white/90" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </header>

      <div className="mx-auto max-w-2xl p-4">
        {/* Profile Card */}
        <Card className="mb-6 p-6">
          <div className="mb-4 flex justify-end">
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-center">
            <div className="relative mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Swetha Varma"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <div className="mb-2 flex items-center justify-center gap-2">
              <h1 className="text-xl font-semibold">Swetha Varma</h1>
              <CheckCircle className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-sm text-gray-600">Consultant Clinical Psychologist</p>
            <p className="mt-2 text-sm">10+ Years of experience</p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <p className="font-semibold">Starting at 1,200</p>
              <span className="text-sm text-gray-500">/session</span>
            </div>
            <div className="mt-2 flex items-center justify-center gap-1 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>Block A2, Delhi</span>
            </div>
          </div>
          <Button className="mt-4 w-full bg-blue-500 hover:bg-blue-600">Book session</Button>
        </Card>

        {/* About Section */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">About me</h2>
          <p className="text-gray-600">
  Hello, I&apos;m Swetha, a licensed therapist dedicated to guiding individuals through life&apos;s challenges with empathy
  and expertise. With over 10 years of experience, I specialize in helping clients manage anxiety, depression, and
  relationship issues through personalized, evidence-based practices.
</p>

          <Button variant="link" className="mt-2 p-0 text-blue-500">
            Read more
          </Button>
        </section>

        {/* Credentials Section */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Credentials</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="mt-1 h-4 w-4 text-blue-500" />
              <div>
                <p className="font-medium">Ph.D. in Clinical Psychology</p>
                <p className="text-sm text-gray-600">Harvard University</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="mt-1 h-4 w-4 text-blue-500" />
              <div>
                <p className="font-medium">M.A. in Counseling</p>
                <p className="text-sm text-gray-600">University of California, Berkeley</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="mt-1 h-4 w-4 text-blue-500" />
              <div>
                <p className="font-medium">Licensed Professional Counselor (LPC)</p>
                <p className="text-sm text-gray-600">State of DEF</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Available on Section */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Available on</h2>
          <div className="flex gap-4">
            <Card className="flex flex-1 flex-col items-center p-4">
              <Home className="mb-2 h-6 w-6" />
              <span className="text-sm">In-person</span>
            </Card>
            <Card className="flex flex-1 flex-col items-center p-4">
              <Phone className="mb-2 h-6 w-6" />
              <span className="text-sm">Video/ Voice call</span>
            </Card>
          </div>
        </section>

        {/* Therapy Services Section */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">I offer therapy for</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Stress Management</Badge>
            <Badge variant="outline">Relationship Skills</Badge>
            <Badge variant="outline">Anxiety Reduction</Badge>
            <Badge variant="outline">Depression Relief</Badge>
            <Badge variant="outline">Behavioral</Badge>
            <Badge variant="outline">Trauma Healing</Badge>
          </div>
        </section>

        {/* Location and Languages Section */}
        <div className="mb-8 grid gap-8 md:grid-cols-2">
          <section>
            <h2 className="mb-4 text-xl font-semibold">I am from</h2>
            <p className="text-gray-600">Chennai, India</p>
          </section>
          <section>
            <h2 className="mb-4 text-xl font-semibold">Languages</h2>
            <p className="text-gray-600">English, Hindi</p>
          </section>
        </div>

        {/* Testimonials Section */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Client Testimonials</h2>
            <Button variant="ghost" size="sm">
              Show more
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-4">
            <p className="mb-4 text-gray-600">
  &quot;The guidance I received helped me manage my stress and live a more balanced life.&quot;
</p>

              <p className="text-sm font-medium">Anonymous</p>
            </Card>
            <Card className="p-4">
              <p className="mb-4 text-gray-600">
              &quot;Therapy helped me build self-esteem and confidence that I never thought possible.&quot;
              </p>
              <p className="text-sm font-medium">Anonymous</p>
            </Card>
          </div>
        </section>
      </div>
    </div>
    
  )
}