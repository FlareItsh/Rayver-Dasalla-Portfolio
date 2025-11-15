import React from 'react';
import Button from '../components/ui/Button';

export default function Contact() {
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default for custom handling
    const formData = new FormData(e.target);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        alert('Message sent successfully!'); // Or update UI state
        e.target.reset(); // Clear form
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Form error:', error);
      alert('Something went wrong—try again!');
    }
  };

  return (
    <>
      <div className="text-textPrimary my-20 flex min-h-[70vh] flex-col items-center justify-center px-4 md:px-0">
        <h2 className="mb-6 text-center text-4xl font-bold sm:text-5xl md:mb-10 lg:text-6xl">
          Contact Me
        </h2>

        <form
          name="contact"
          className="flex w-full max-w-md flex-col gap-6 md:gap-10"
          onSubmit={handleSubmit} // Now handles submission client-side
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="contact" />
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
