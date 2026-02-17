'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
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
            const response = await fetch('https://formsubmit.co/ajax/coldroombazaar@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    leadType: 'contact_form',
                    _subject: `New Contact Message from ${formData.name}`,
                    _template: 'table'
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage('Thank you! Your message has been sent successfully.');
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                throw new Error(result.message || 'Failed to send message');
            }
        } catch (error: unknown) {
            setStatus('error');
            setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again later.');
        } finally {
            setStatus('idle');
        }
    };

    return (
        <section id="contact" className="section-padding bg-[#0D0B1A] relative">
            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left Column: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/3"
                        transition={{ duration: 0.5 }}
                    >
                        <span className="flex items-center gap-2 text-orange-500 font-bold tracking-widest text-sm uppercase mb-4">
                            <span className="w-2 h-2 rounded-full bg-orange-500" />
                            Get In Touch
                        </span>
                        <h2 className="text-5xl font-bold text-white mb-6">Contact Us</h2>
                        <p className="text-gray-400 mb-12">
                            Have questions? We are always here to help. Get in touch with us today.
                        </p>

                        <div className="space-y-8">
                            <div className="flex gap-6 group">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-white flex items-center justify-center text-2xl shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg mb-1">Address</h4>
                                    <p className="text-gray-400 leading-relaxed text-sm">
                                        H-58, Tetutala Road, Molla Para,<br />
                                        PO - Kajipara, Madhyamgram,<br />
                                        Kolkata - 700125, West Bengal.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6 group">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-white flex items-center justify-center text-2xl shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300">
                                    <FaPhoneAlt />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg mb-1">Phone</h4>
                                    <p className="text-gray-400 font-medium hover:text-orange-500 transition-colors">
                                        <a href="tel:+917860000929">+91 786-0000-929</a>
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6 group">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-white flex items-center justify-center text-2xl shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg mb-1">Email</h4>
                                    <p className="text-gray-400 font-medium hover:text-orange-500 transition-colors">
                                        <a href="mailto:info@technofitters.in">info@technofitters.in</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:w-2/3 bg-white/5 p-8 md:p-12 rounded-3xl border border-gray-800 backdrop-blur-sm shadow-xl"
                    >
                        <h3 className="text-3xl font-bold text-white mb-8">Send Us A Message</h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name*"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 rounded-full border border-gray-700 bg-gray-900/50 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder:text-gray-500"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email*"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 rounded-full border border-gray-700 bg-gray-900/50 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder:text-gray-500"
                                />
                            </div>

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number*"
                                required
                                value={formData.phone}
                                minLength={10}
                                onChange={handleChange}
                                className="w-full px-6 py-4 rounded-full border border-gray-700 bg-gray-900/50 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder:text-gray-500"
                            />

                            <textarea
                                name="message"
                                placeholder="Message"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-6 py-4 rounded-3xl border border-gray-700 bg-gray-900/50 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder:text-gray-500 resize-none"
                            ></textarea>

                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="px-10 py-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold uppercase tracking-wider rounded-full shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full md:w-auto"
                            >
                                {status === 'submitting' ? 'Sending...' : 'Send Message'}
                            </button>

                            {status === 'success' && (
                                <p className="text-green-500 font-medium animate-fade-in mt-4">
                                    ✅ {message}
                                </p>
                            )}
                            {status === 'error' && (
                                <p className="text-red-500 font-medium animate-fade-in mt-4">
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
