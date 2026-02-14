'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPhoneAlt, FaCheckCircle } from 'react-icons/fa';
import confetti from 'canvas-confetti';

interface QuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    type?: 'quote' | 'consultant'; // 'quote' shows form, 'consultant' shows phone + form
}

export default function QuoteModal({ isOpen, onClose, type = 'quote' }: QuoteModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        comments: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const triggerConfetti = () => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch('/contact.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.status === 'success') {
                setStatus('success');
                triggerConfetti();
                // Reset form after delay
                setTimeout(() => {
                    onClose();
                    setStatus('idle');
                    setFormData({ name: '', email: '', phone: '', comments: '' });
                }, 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                            >
                                <FaTimes size={20} />
                            </button>

                            {/* Logic for Consultant Type */}
                            {type === 'consultant' && status !== 'success' && (
                                <div className="bg-brand-ripple/10 p-6 text-center border-b border-brand-ripple/20">
                                    <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-3">
                                        <FaPhoneAlt size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">Direct Consultation</h3>
                                    <p className="text-gray-600 mb-3">Call our expert consultant right now:</p>
                                    <a href="tel:+917860000929" className="text-2xl font-bold text-brand-green hover:underline">
                                        +91 786-0000-929
                                    </a>
                                </div>
                            )}

                            <div className="p-8">
                                {status === 'success' ? (
                                    <div className="text-center py-10">
                                        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <FaCheckCircle size={40} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You! 🎉</h3>
                                        <p className="text-gray-600">
                                            We&apos;ve received your request. Let&apos;s celebrate this new beginning!
                                            Our team will contact you shortly.
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                            {type === 'quote' ? 'Get a Free Quote' : 'Request Callback'}
                                        </h2>
                                        <p className="text-gray-500 mb-6">
                                            Fill out the form below and we&apos;ll get back to you within 24 hours.
                                        </p>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
                                                    placeholder="John Doe"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
                                                        placeholder="john@example.com"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        required
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
                                                        placeholder="+91 987..."
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Project Details</label>
                                                <textarea
                                                    name="comments"
                                                    rows={3}
                                                    value={formData.comments}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
                                                    placeholder="Tell us about your requirements..."
                                                ></textarea>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={status === 'submitting'}
                                                className="w-full bg-brand-green hover:bg-brand-leaf text-white font-semibold py-3 rounded-lg transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {status === 'submitting' ? 'Sending...' : 'Submit Request'}
                                            </button>

                                            {status === 'error' && (
                                                <p className="text-red-500 text-sm text-center">
                                                    Something went wrong. Please try again.
                                                </p>
                                            )}
                                        </form>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
