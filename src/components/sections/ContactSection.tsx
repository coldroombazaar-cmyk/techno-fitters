'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        comments: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setMessage('');

        try {
            const response = await fetch('/contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData as any).toString()
            });

            if (response.ok) {
                setStatus('success');
                setMessage('Thank you! Your message has been sent successfully.');
                setFormData({ name: '', email: '', phone: '', comments: '' });
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Something went wrong. Please try again later.');
        }
    };

    return (
        <section id="contact" className="py-24 bg-white relative">
            <div className="container mx-auto px-8 md:px-12 lg:px-20">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left Column: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/3"
                    >
                        <h2 className="text-4xl font-light text-brand-green mb-2 uppercase tracking-wide">Get In Touch</h2>
                        <div className="w-20 h-1 bg-brand-ripple mb-10"></div>

                        <div className="space-y-8">
                            <div className="flex gap-4 group">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-ripple to-blue-600 text-white flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <h4 className="text-brand-green font-bold text-lg mb-1">Address</h4>
                                    <p className="text-gray-600 leading-relaxed max-w-xs">
                                        H-58, Tetutala Road, Molla Para,<br />
                                        PO - Kajipara, Madhyamgram,<br />
                                        Kolkata - 700125, West Bengal.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 group">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-ripple to-blue-600 text-white flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <FaPhoneAlt />
                                </div>
                                <div>
                                    <h4 className="text-brand-green font-bold text-lg mb-1">Phone</h4>
                                    <p className="text-gray-600 hover:text-brand-highlight transition-colors">
                                        <a href="tel:+917860000929">+91 786-0000-929</a>
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 group">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-ripple to-blue-600 text-white flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <h4 className="text-brand-green font-bold text-lg mb-1">Email</h4>
                                    <p className="text-gray-600 hover:text-brand-highlight transition-colors">
                                        <a href="mailto:technofitters@gmail.com">technofitters@gmail.com</a>
                                    </p>
                                </div>
                            </div>

                            {/* Map Embed */}
                            <div className="mt-8 rounded-xl overflow-hidden shadow-md border border-gray-100 h-64 w-full">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.338575975156!2d88.45663737597656!3d22.67843797941575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89f1f0d3b6fbd%3A0x7d6b3d6f1f0d3b6f!2sTetutala%20Rd%2C%20Madhyamgram%2C%20Kolkata%2C%20West%20Bengal%20700129!5e0!3m2!1sen!2sin!4v1707920000000!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="lg:w-2/3 bg-gray-50 p-8 md:p-12 rounded-2xl border border-gray-100 shadow-sm"
                    >
                        <h3 className="text-3xl font-medium text-brand-green mb-8">Send Us A Message</h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name*"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-ripple focus:ring-2 focus:ring-brand-ripple/20 outline-none transition-all placeholder:text-gray-400 text-gray-800 bg-white"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email*"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-ripple focus:ring-2 focus:ring-brand-ripple/20 outline-none transition-all placeholder:text-gray-400 text-gray-800 bg-white"
                                />
                            </div>

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone*"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-ripple focus:ring-2 focus:ring-brand-ripple/20 outline-none transition-all placeholder:text-gray-400 text-gray-800 bg-white"
                            />

                            <textarea
                                name="comments"
                                placeholder="Comments"
                                rows={4}
                                value={formData.comments}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-ripple focus:ring-2 focus:ring-brand-ripple/20 outline-none transition-all placeholder:text-gray-400 text-gray-800 bg-white resize-none"
                            ></textarea>

                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="px-8 py-3 bg-gradient-to-r from-brand-ripple to-blue-700 text-white font-medium rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {status === 'submitting' ? 'Sending...' : 'Send Your Message'}
                            </button>

                            {/* Status Messages */}
                            {status === 'success' && (
                                <p className="text-green-600 font-medium animate-fade-in mt-4">
                                    ✅ {message}
                                </p>
                            )}
                            {status === 'error' && (
                                <p className="text-red-600 font-medium animate-fade-in mt-4">
                                    ❌ {message}
                                </p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
