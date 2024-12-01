"use client"
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from "react-icons/fa";
import { MdVerified } from 'react-icons/md';
import { Share2, MapPin } from "lucide-react";
import { Card } from "./components/card";
import Button from "./components/button";
import ShareModal from "./components/sharemodel"; // Import the ShareModal component
import Image from "next/image";
import TherapistProfile from "../app/components/abousection";

const GridLayout = () => {
  const router = useRouter(); // Initialize router
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleBookSession = () => {
    router.push('/pricingsection'); // Navigate to the booking session
  };

  const openShareModal = () => {
    setIsModalOpen(true); // Open the share modal
  };

  const closeShareModal = () => {
    setIsModalOpen(false); // Close the share modal
  };

  return (
    <div className="min-h-screen m-0">
      <div>
        <div className="grid md:grid-cols-12">
          <div className="md:col-span-4 w-full h-screen flex justify-center items-center bg-[#3B82F6] md:sticky md:top-0">
            <div className="flex flex-col items-center w-full max-w-xs">
              <Card className="p-4 w-full m-0">
                <div className="mb-4 flex justify-end">
                  <Button variant="ghost" size="icon" onClick={openShareModal}>
                    <Share2 className="h-4 w-4 text-black" />
                  </Button>
                </div>
                <div className="text-center">
                  <div className="relative mx-auto mb-4 w-48 h-48 overflow-hidden rounded-lg">
                    <Image
                      src="/user.jpeg"
                      alt="Swetha Varma"
                      width={192}
                      height={192}
                      className="object-cover"
                    />
                  </div>
                  <div className="mb-2 flex items-center justify-center gap-2">
                    <Share2 className="h-6 w-6 text-black" onClick={openShareModal}/>
                    <h1 className="text-xl font-semibold text-black">Swetha Varma</h1>
                    <MdVerified className="text-blue-500 h-5 w-5" />
                  </div>
                  <p className="text-sm text-black">Consultant Clinical Psychologist</p>
                  <p className="mt-2 text-sm text-black">10+ Years of experience</p>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <p className="font-semibold text-black">Starting at 1,200</p>
                    <span className="text-sm text-black">/session</span>
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-1 text-sm text-black">
                    <MapPin className="h-4 w-4" />
                    <span>Block A2, Delhi</span>
                  </div>
                </div>
              </Card>

              <button className="flex items-center text-white mb-6 hover:opacity-90 absolute top-0 left-0 mt-4 ml-4">
                <FaArrowLeft className="h-4 w-4 text-white mr-2" />
                <span className="text-lg text-white">Back</span>
              </button>

              <button 
                onClick={handleBookSession} 
                className="mt-6 w-full font-extrabold text-xl max-w-xs bg-white hover:bg-gray-100 border-4 border-[#2078d7] text-[#2078d7] rounded-3xl px-6 py-3"
              >
                Book session
              </button>
            </div>
          </div>

          <div className="md:col-span-8 bg-white">
            <TherapistProfile />
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {isModalOpen && <ShareModal closeModal={closeShareModal} />}
    </div>
  );
};

export default GridLayout;
