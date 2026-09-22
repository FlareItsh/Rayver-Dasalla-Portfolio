import React, { useState } from 'react';
import Button from '../components/ui/Button';
import {
  X,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check,
  User,
  MessageSquare,
  ArrowUpRight,
  Loader2,
} from 'lucide-react';

export default function Contact() {
  const [modalState, setModalState] = useState({ isOpen: false, type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('rayverdasalla@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
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
          message: 'Thank you! Your message has been sent successfully.',
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
        message: 'Something went wrong. Please try again or email me directly!',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: '', message: '' });
  };

  return (
    <>
      <div className="relative my-8 px-4 sm:px-8 md:my-14 md:px-16 lg:px-20">
        {/* Section Number Background */}
        <div className="pointer-events-none absolute -top-10 left-4 text-[11rem] leading-none font-black opacity-[0.03] select-none sm:left-8 sm:text-[15rem] md:text-[18rem]">
          03
        </div>

        {/* Section Header */}
        <div className="mb-8 text-left sm:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-400/20 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-textPrimary/80 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Available for new opportunities
          </div>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-textPrimary sm:text-5xl md:text-6xl">
            Contact Me
          </h2>
          <p className="mt-2 max-w-xl text-base text-textPrimary/70 sm:text-lg">
            Have a project in mind, a question, or want to collaborate? Let's connect.
          </p>
        </div>

        {/* Main Content: 2-Column Balanced Layout */}
        <div className="mx-auto grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Direct Info */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            <div className="space-y-4">
              {/* Email with 1-click Copy */}
              <div className="group flex items-center justify-between rounded-xl border border-gray-400/20 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-gray-500/40 hover:bg-white/10">
                <div className="flex items-center gap-3.5 overflow-hidden">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-white/10 dark:text-white">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-textPrimary/50">Email</p>
                    <a
                      href="mailto:rayverdasalla@gmail.com"
                      className="block truncate text-sm font-semibold text-textPrimary hover:underline sm:text-base"
                    >
                      rayverdasalla@gmail.com
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-400/20 bg-black/5 px-2.5 py-1.5 text-xs font-medium text-textPrimary/80 transition-all duration-200 hover:bg-black/10 hover:text-textPrimary dark:bg-white/5 dark:hover:bg-white/15"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-xs text-emerald-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span className="text-xs">Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone */}
              <a
                href="tel:+639321296896"
                className="group flex items-center justify-between rounded-xl border border-gray-400/20 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-gray-500/40 hover:bg-white/10"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-white/10 dark:text-white">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-textPrimary/50">Phone / WhatsApp</p>
                    <p className="text-sm font-semibold text-textPrimary sm:text-base">
                      +63 932 129 6896
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-textPrimary/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-textPrimary" />
              </a>

              {/* Location */}
              <div className="flex items-center gap-3.5 rounded-xl border border-gray-400/20 bg-white/5 p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-white/10 dark:text-white">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-textPrimary/50">Location</p>
                  <p className="text-sm font-semibold text-textPrimary sm:text-base">
                    Davao City, Philippines
                  </p>
                </div>
              </div>
            </div>

            {/* Social Connection Pills */}
            <div>
              <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-textPrimary/60">
                Connect Directly
              </p>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href="https://github.com/FlareItsh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-400/20 bg-white/5 px-3.5 py-2 text-xs font-semibold text-textPrimary transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-500/40 hover:bg-white/10 sm:text-sm"
                >
                  <i className="fa-brands fa-github text-sm"></i>
                  <span>GitHub</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                </a>
                <a
                  href="https://www.linkedin.com/in/rayver-dasalla-617b95391/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-400/20 bg-white/5 px-3.5 py-2 text-xs font-semibold text-textPrimary transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-500/40 hover:bg-white/10 sm:text-sm"
                >
                  <i className="fa-brands fa-linkedin text-sm"></i>
                  <span>LinkedIn</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                </a>
                <a
                  href="https://www.facebook.com/rayver.dasalla.7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-400/20 bg-white/5 px-3.5 py-2 text-xs font-semibold text-textPrimary transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-500/40 hover:bg-white/10 sm:text-sm"
                >
                  <i className="fa-brands fa-facebook text-sm"></i>
                  <span>Facebook</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Glassmorphic Form Card */}
          <div className="lg:col-span-7">
            <div className="relative flex h-full flex-col justify-between rounded-2xl border border-gray-400/20 bg-white/5 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-gray-500/30 sm:p-7 md:p-8">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                {/* 2-Column Row for Name & Email on sm+ */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-textPrimary/80 sm:text-sm"
                    >
                      <User className="h-3.5 w-3.5 opacity-70" />
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      className="w-full rounded-xl border border-gray-400/20 bg-black/5 px-4 py-3 text-sm text-textPrimary placeholder:text-textPrimary/40 transition-all duration-200 focus:border-primary focus:bg-transparent focus:ring-2 focus:ring-primary/20 focus:outline-none dark:bg-white/5"
                      placeholder="e.g. John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-textPrimary/80 sm:text-sm"
                    >
                      <Mail className="h-3.5 w-3.5 opacity-70" />
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      className="w-full rounded-xl border border-gray-400/20 bg-black/5 px-4 py-3 text-sm text-textPrimary placeholder:text-textPrimary/40 transition-all duration-200 focus:border-primary focus:bg-transparent focus:ring-2 focus:ring-primary/20 focus:outline-none dark:bg-white/5"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Message field */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-textPrimary/80 sm:text-sm"
                  >
                    <MessageSquare className="h-3.5 w-3.5 opacity-70" />
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    className="resize-vertical min-h-24 w-full rounded-xl border border-gray-400/20 bg-black/5 px-4 py-3 text-sm text-textPrimary placeholder:text-textPrimary/40 transition-all duration-200 focus:border-primary focus:bg-transparent focus:ring-2 focus:ring-primary/20 focus:outline-none dark:bg-white/5 sm:min-h-28"
                    placeholder="Hi Rayver, I'd like to talk about..."
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2.5"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>SENDING...</span>
                      </>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Glassmorphic Modal */}
      {modalState.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-gray-400/20 bg-background/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 rounded-lg p-1.5 text-textPrimary/60 transition-colors hover:bg-white/10 hover:text-textPrimary"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Icon and Message */}
            <div className="flex flex-col items-center text-center">
              {modalState.type === 'success' ? (
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <CheckCircle className="h-10 w-10" />
                </div>
              ) : (
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                  <XCircle className="h-10 w-10" />
                </div>
              )}
              <h4 className="text-xl font-bold text-textPrimary">
                {modalState.type === 'success' ? 'Message Sent!' : 'Oops!'}
              </h4>
              <p className="mt-2 text-sm text-textPrimary/70 sm:text-base">
                {modalState.message}
              </p>
            </div>

            {/* OK Button */}
            <div className="mt-6 flex justify-center">
              <Button
                onClick={closeModal}
                className="w-full sm:w-auto px-8"
              >
                DONE
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
