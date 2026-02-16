'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPhoneAlt } from 'react-icons/fa';
import SuccessPopup from './SuccessPopup';

const FORM_CONFIG = {
  quote: {
    title: 'Get Your Free Quote',
    buttonText: 'GET FREE QUOTE',
    subtext: "Fill out this form and we'll connect within 24 hours.",
  },
  consultation: {
    title: 'Request Consultation',
    buttonText: 'REQUEST CONSULTATION',
    subtext: "Share your requirements and we'll schedule a call.",
  },
  consultant: {
    title: 'Get Expert Consultant',
    buttonText: 'GET CONSULTANT',
    subtext: "Our expert will reach out to discuss your project.",
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
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok && result.success) {
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative flex flex-col max-h-[90vh]"
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors z-10 p-1 bg-white/50 rounded-full"
              aria-label="Close"
            >
              <FaTimes size={16} />
            </button>

            {status !== 'success' && (
              <div className="bg-brand-green/5 px-6 py-4 flex items-center gap-4 border-b border-brand-green/10">
                <div className="w-10 h-10 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center flex-shrink-0">
                  <FaPhoneAlt size={16} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    Direct Consultation
                  </p>
                  <a
                    href="tel:+917860000929"
                    className="text-lg font-bold text-gray-900 hover:text-brand-green transition-colors"
                  >
                    +91 786-0000-929
                  </a>
                </div>
              </div>
            )}

            <div className="p-6 overflow-y-auto">
              {status === 'success' ? (
                <SuccessPopup leadType={type} onClose={handleClose} autoCloseMs={3000} />
              ) : (
                <>
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-900">{config.title}</h2>
                    <p className="text-xs text-gray-500 mt-1">{config.subtext}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-1 focus:ring-brand-green focus:border-brand-green outline-none ${
                          fieldErrors.name ? 'border-red-400' : 'border-gray-200'
                        }`}
                        placeholder="Full Name"
                      />
                      {fieldErrors.name && (
                        <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-1 focus:ring-brand-green focus:border-brand-green outline-none ${
                            fieldErrors.email ? 'border-red-400' : 'border-gray-200'
                          }`}
                          placeholder="Email Address"
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
                          className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-1 focus:ring-brand-green focus:border-brand-green outline-none ${
                            fieldErrors.phone ? 'border-red-400' : 'border-gray-200'
                          }`}
                          placeholder="Phone Number"
                        />
                        {fieldErrors.phone && (
                          <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <textarea
                        name="message"
                        rows={3}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-1 focus:ring-brand-green focus:border-brand-green outline-none resize-none ${
                          fieldErrors.message ? 'border-red-400' : 'border-gray-200'
                        }`}
                        placeholder="Brief project details or message..."
                      />
                      {fieldErrors.message && (
                        <p className="text-red-500 text-xs mt-1">{fieldErrors.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full bg-brand-green hover:bg-brand-leaf text-white font-bold py-2.5 rounded-lg text-sm transition-all duration-300 shadow-md shadow-brand-green/20 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest flex items-center justify-center gap-2 min-h-[44px]"
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
                          Sending...
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
