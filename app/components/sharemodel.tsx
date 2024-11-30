'use client'

import { useState } from 'react'

export default function ShareModal({closeModal}) {
  const [showCopied, setShowCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const pageUrl = 'http://www.therapist-swetha.com/profile/view'

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl)
      setShowCopied(true)
      setTimeout(() => setShowCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold">Share</h2>
          <button 
            onClick={closeModal} // Use the passed closeModal function to close the modal
            className="p-1 hover:bg-gray-100 rounded-full"
          > 
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Success Message */}
        {showCopied && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-[#99C5FF] text-black px-6 py-2 rounded-full">
            Link copied!
          </div>
        )}

        {/* Social Share Options */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            {
              name: 'Facebook',
              icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <path 
                    fill="currentColor"
                    d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"
                  />
                </svg>
              ),
            },
            {
              name: 'WhatsApp',
              icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <path 
                    fill="currentColor"
                    d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.34 8.7 7.33 8.53 7.33Z"
                  />
                </svg>
              ),
            },
            {
              name: 'Twitter',
              icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <path 
                    fill="currentColor"
                    d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
                  />
                </svg>
              ),
            },
            {
              name: 'Mail',
              icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <path 
                    fill="currentColor"
                    d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                  />
                </svg>
              ),
            },
          ].map((option) => (
            <button
              key={option.name}
              className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-50"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
                {option.icon}
              </div>
              <span className="text-sm text-gray-600">{option.name}</span>
            </button>
          ))}
        </div>

        {/* Page Link Section */}
        <div>
          <h3 className="text-sm font-medium mb-2">Page Link</h3>
          <div className="flex gap-3">
            <div className="flex-1 bg-gray-100 rounded-lg p-3 text-sm text-gray-600 truncate">
              {pageUrl}
            </div>
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 text-[#2F80ED] border border-[#2F80ED] rounded-lg hover:bg-blue-50"
            >
              Copy link
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

