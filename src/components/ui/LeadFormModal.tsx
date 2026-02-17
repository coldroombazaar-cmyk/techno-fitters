'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPhoneAlt, FaCalendarCheck } from 'react-icons/fa';
import SuccessPopup from './SuccessPopup';

const FORM_CONFIG = {
  quote: {
    title: 'Get Your Free Quote',
    buttonText: 'GET FREE QUOTE',
    subtext: "Fill out this form and we'll connect within 24 hours.",
    theme: 'orange', // To differentiate styles if needed
  },
  consultation: {
    title: 'Request Consultation',
    buttonText: 'REQUEST CONSULTATION',
    subtext: "Share your requirements and we'll schedule a call.",
    theme: 'blue',
  },
  consultant: {
    title: 'Get Expert Consultant',
    buttonText: 'GET CONSULTANT',
    subtext: "Our expert will reach out to discuss your project.",
    theme: 'purple',
  },
} as const;

export type LeadType = 'quote' | 'consultation' | 'consultant';

interface LeadFormModalProps {
  type: LeadType;
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadFormModal({ type, isOpen, onClose }: LeadFormModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const config = FORM_CONFIG[type];

  // Dynamic Styles based on Modal Type
  const isConsultation = type === 'consultation';
  const headerBg = isConsultation ? 'bg-blue-50 border-blue-100' : 'bg-orange-50 border-orange-100';
  const iconBg = isConsultation ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-500';
  const buttonGradient = isConsultation
    ? 'from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-blue-500/20'
    : 'from-[#FF9966] to-[#FF5E62] hover:from-[#FF8855] hover:to-[#FF4444] shadow-orange-500/20';
  const focusRing = isConsultation ? 'focus:ring-blue-500 focus:border-blue-500' : 'focus:ring-orange-500 focus:border-orange-500';


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    setFieldErrors({});

    const payload = { ...formData, leadType: type };

    try {
      const res = await fetch('https://formsubmit.co/ajax/coldroombazaar@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...payload,
          _subject: `New ${config.title} Request from ${formData.name}`,
          _template: 'table'
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(result.message ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const handleClose = () => {
    setStatus('idle');
    setFormData({ name: '', email: '', phone: '', message: '' });
    setErrorMessage('');
    setFieldErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative flex flex-col max-h-[90vh]"
          >

            {/* Header Section */}
            <div className={`${headerBg} px-8 py-6 flex items-center gap-4 border-b relative transition-colors duration-300`}>
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                aria-label="Close"
              >
                <FaTimes size={14} />
              </button>

              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-xl ${iconBg}`}>
                {isConsultation ? <FaCalendarCheck /> : <FaPhoneAlt />}
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-0.5">
                  {isConsultation ? 'Book a Session' : 'Direct Consultation'}
                </p>
                <a
                  href="tel:+917860000929"
                  className={`text-xl font-bold text-gray-900 transition-colors block leading-none ${isConsultation ? 'hover:text-blue-600' : 'hover:text-orange-500'}`}
                >
                  +91 786-0000-929
                </a>
              </div>
            </div>

            <div className="p-8 overflow-y-auto">
              {status === 'success' ? (
                <SuccessPopup leadType={type} onClose={handleClose} autoCloseMs={3000} />
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{config.title}</h2>
                    <p className="text-sm text-gray-500">{config.subtext}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 text-sm border bg-gray-50 text-black rounded-lg outline-none transition-all ${focusRing} ${fieldErrors.name ? 'border-red-400' : 'border-gray-200 focus:bg-white'
                          }`}
                        placeholder="Name"
                      />
                      {fieldErrors.name && (
                        <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>
                      )}
                    </div>

                    {/* Email and Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 text-sm border bg-gray-50 text-black rounded-lg outline-none transition-all ${focusRing} ${fieldErrors.email ? 'border-red-400' : 'border-gray-200 focus:bg-white'
                            }`}
                          placeholder="Email"
                        />
                        {fieldErrors.email && (
                          <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
                        )}
                      </div>
                      <div>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 text-sm border bg-gray-50 text-black rounded-lg outline-none transition-all ${focusRing} ${fieldErrors.phone ? 'border-red-400' : 'border-gray-200 focus:bg-white'
                            }`}
                          placeholder="Phone"
                        />
                        {fieldErrors.phone && (
                          <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <textarea
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 text-sm border bg-gray-50 text-black rounded-lg outline-none resize-none transition-all ${focusRing} ${fieldErrors.message ? 'border-red-400' : 'border-gray-200 focus:bg-white'
                          }`}
                        placeholder="How can we help you?"
                      />
                      {fieldErrors.message && (
                        <p className="text-red-500 text-xs mt-1">{fieldErrors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className={`w-full bg-gradient-to-r text-white font-bold py-4 rounded-lg text-sm transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest flex items-center justify-center gap-2 mt-2 ${buttonGradient}`}
                    >
                      {status === 'submitting' ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Process Request...
                        </>
                      ) : (
                        config.buttonText
                      )}
                    </button>

                    {status === 'error' && errorMessage && (
                      <p className="text-red-500 text-xs text-center mt-2">{errorMessage}</p>
                    )}
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
