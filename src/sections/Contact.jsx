import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { X, CheckCircle, XCircle } from 'lucide-react';

export default function Contact() {
  const [modalState, setModalState] = useState({ isOpen: false, type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await fetch('https://formspree.io/f/mgvjjdbe', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setModalState({
          isOpen: true,
          type: 'success',
          message: 'Message sent successfully!',
        });
        e.target.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Form error:', error);
      setModalState({
        isOpen: true,
        type: 'error',
        message: 'Something went wrong—try again!',
      });
    }
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: '', message: '' });
  };

  return (
    <>
      <div className="text-textPrimary my-20 flex min-h-[70vh] flex-col items-center justify-center px-4 sm:px-8 md:px-12">
        <h2 className="mb-6 text-center text-4xl font-bold sm:text-5xl md:mb-10 lg:text-6xl">
          Contact Me
        </h2>

        <form
          className="flex w-full max-w-md flex-col gap-4 sm:gap-6 md:gap-10"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            className="focus:ring-primary w-full rounded-sm border px-3 py-3 text-sm focus:ring-2 focus:outline-none sm:text-base md:px-4 md:text-lg"
            placeholder="Your Name"
            required
          />

          <input
            type="email"
            name="email"
            className="focus:ring-primary w-full rounded-sm border px-3 py-3 text-sm focus:ring-2 focus:outline-none sm:text-base md:px-4 md:text-lg"
            placeholder="Your email"
            required
          />

          <textarea
            name="message"
            className="focus:ring-primary resize-vertical min-h-24 w-full rounded-sm border px-3 py-3 text-sm focus:ring-2 focus:outline-none sm:min-h-32 sm:text-base md:px-4 md:text-lg"
            placeholder="Your message"
            required
          ></textarea>

          <Button type="submit" className="w-full md:w-auto">
            SEND MESSAGE
          </Button>
        </form>
      </div>

      {/* Modal */}
      {modalState.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={closeModal}
        >
          <div
            className="bg-modalBackground relative w-full max-w-md rounded-lg p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button onClick={closeModal} className="absolute top-4 right-4 transition-colors">
              <X className="h-5 w-5" />
            </button>

            {/* Icon and Message */}
            <div className="flex flex-col items-center text-center">
              {modalState.type === 'success' ? (
                <CheckCircle className="mb-4 h-16 w-16" />
              ) : (
                <XCircle className="mb-4 h-16 w-16 text-red-500" />
              )}
              <p className="text-lg font-medium">{modalState.message}</p>
            </div>

            {/* OK Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={closeModal}
                className="border-2 border-[#16302b] bg-white px-4 py-1 text-[#16302b]"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
