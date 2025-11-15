import React from 'react';
import Button from '../components/ui/Button';

export default function Contact() {
  const handleSubmit = (e) => {
    console.log('Form submitted!'); // Debug: Check console on submit to confirm it fires
    // No preventDefault here—let Netlify handle the native form submission
  };

  return (
    <>
      <div className="text-textPrimary my-20 flex min-h-[70vh] flex-col items-center justify-center px-4 md:px-0">
        <h2 className="mb-6 text-center text-4xl font-bold sm:text-5xl md:mb-10 lg:text-6xl">
          Contact Me
        </h2>

        <form
          name="contact"
          method="POST"
          action="/" // Helps with SPA routing (e.g., React Router) by posting to root
          encType="multipart/form-data" // Future-proofs for potential file uploads
          className="flex w-full max-w-md flex-col gap-6 md:gap-10"
          data-netlify="true" // FIXED: This is the key—Netlify scans for this data attribute at build time
          onSubmit={handleSubmit} // Optional: For client-side debugging (remove if no JS needed)
        >
          {/* Required hidden input for Netlify to identify the form */}
          <input type="hidden" name="form-name" value="contact" />

          {/* Honeypot for spam protection—hidden from real users */}
          <p className="hidden">
            <label>
              Don’t fill this out: <input name="bot-field" />
            </label>
          </p>

          <input
            type="text"
            name="name"
            className="focus:ring-primary w-full rounded-sm border px-4 py-3 text-base focus:ring-2 focus:outline-none md:text-lg"
            placeholder="Your Name"
            required
          />

          <input
            type="email"
            name="email"
            className="focus:ring-primary w-full rounded-sm border px-4 py-3 text-base focus:ring-2 focus:outline-none md:text-lg"
            placeholder="Your email"
            required
          />

          <textarea
            name="message"
            className="focus:ring-primary resize-vertical min-h-32 w-full rounded-sm border px-4 py-3 text-base focus:ring-2 focus:outline-none md:text-lg"
            placeholder="Your message"
            required
          ></textarea>

          <Button type="submit" className="w-full md:w-auto">
            SEND MESSAGE
          </Button>
        </form>
      </div>
    </>
  );
}
