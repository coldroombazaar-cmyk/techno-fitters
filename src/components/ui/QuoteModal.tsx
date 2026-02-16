'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPhoneAlt, FaCheckCircle } from 'react-icons/fa';
import confetti from 'canvas-confetti';

// ... (imports remain same)

interface QuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    type?: 'quote' | 'consultant';
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
            if (timeLeft <= 0) return clearInterval(interval);
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
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData as any).toString()
            });
            const result = await response.json();
            if (result.status === 'success') {
                setStatus('success');
                triggerConfetti();
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
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative flex flex-col max-h-[90vh]"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors z-10 p-1 bg-white/50 rounded-full"
                        >
                            <FaTimes size={16} />
                        </button>

                        {/* Always show Compact Consultant Info Header */}
                        {status !== 'success' && (
                            <div className="bg-brand-green/5 px-6 py-4 flex items-center gap-4 border-b border-brand-green/10">
                                <div className="w-10 h-10 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center flex-shrink-0">
                                    <FaPhoneAlt size={16} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Direct Consultation</p>
                                    <a href="tel:+917860000929" className="text-lg font-bold text-gray-900 hover:text-brand-green transition-colors">
                                        +91 786-0000-929
                                    </a>
                                </div>
                            </div>
                        )}

                        <div className="p-6 overflow-y-auto">
                            {status === 'success' ? (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center py-8"
                                >
                                    <motion.div
                                        animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200"
                                    >
                                        <FaCheckCircle size={36} />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You Message 🎊🎉</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed px-4">
                                        We have received your details. Our team will contact you shortly!
                                    </p>
                                    <button onClick={onClose} className="mt-8 text-sm text-brand-green font-medium hover:underline">Close</button>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="mb-4">
                                        <h2 className="text-xl font-bold text-gray-900">Get your Free Quote</h2>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Fill out this form and we'll connect within 24 hours.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-3">
                                        <div>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-brand-green focus:border-brand-green outline-none"
                                                placeholder="Full Name"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-brand-green focus:border-brand-green outline-none"
                                                placeholder="Email Address"
                                            />
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-brand-green focus:border-brand-green outline-none"
                                                placeholder="Phone Number"
                                            />
                                        </div>

                                        <div>
                                            <textarea
                                                name="comments"
                                                rows={2}
                                                value={formData.comments}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-brand-green focus:border-brand-green outline-none resize-none"
                                                placeholder="Brief project details..."
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={status === 'submitting'}
                                            className="w-full bg-brand-green hover:bg-brand-leaf text-white font-bold py-2.5 rounded-lg text-sm transition-all duration-300 shadow-md shadow-brand-green/20 disabled:opacity-70 uppercase tracking-widest"
                                        >
                                            {status === 'submitting' ? 'Sending...' : 'Get Free Quote'}
                                        </button>

                                        {status === 'error' && (
                                            <p className="text-red-500 text-xs text-center mt-2">
                                                Something went wrong. Please try again.
                                            </p>
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
