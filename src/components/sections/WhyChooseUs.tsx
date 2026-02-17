'use client';

import { motion } from 'framer-motion';
import { FaShieldAlt, FaLeaf, FaStopwatch, FaCogs } from 'react-icons/fa';

// Change this path to use a different image (place your image in public/assets/ or public/)
const ABOUT_SECTION_IMAGE = '/assets/engineering-diagram.png'; // Using the existing asset

const REASONS = [
    {
        icon: <FaCogs />,
        title: 'Unmatched Expertise',
        description: 'Our experienced professionals deliver exceptional digital excellence tailored to your industry.'
    },
    {
        icon: <FaLeaf />,
        title: 'Custom Solutions',
        description: 'We create tailored digital strategies designed specifically to meet your unique business goals.'
    },
    {
        icon: <FaShieldAlt />, // Using available icons
        title: 'Clear Communication',
        description: 'We prioritize transparent updates and feedback throughout the entire project for effective collaboration.'
    },
    {
        icon: <FaStopwatch />,
        title: 'Results Focused',
        description: 'Our data-driven approach guarantees measurable success and continuous improvement.'
    }
];

export default function WhyChooseUsSection() {
    return (
        <section className="section-padding bg-[#0D0B1A] relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                <div className="text-center mb-16">
                    <span className="flex items-center justify-center gap-2 text-orange-500 font-bold tracking-widest text-sm uppercase mb-4">
                        <span className="w-2 h-2 rounded-full bg-orange-500" />
                        Why Choose Us
                    </span>
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Why Our Clients Choose <span className="text-white">TechnoFitters</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        We don't just build cold rooms; we engineer reliability. Our focus on technical excellence ensures your assets are protected around the clock.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                    {/* Left Column */}
                    <div className="space-y-12">
                        {REASONS.slice(0, 2).map((reason, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center md:text-right group"
                            >
                                <div className="inline-block p-4 rounded-full bg-white/5 mb-4 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-pink-500 transition-all duration-300">
                                    <div className="text-orange-500 text-2xl group-hover:text-white transition-colors">
                                        {reason.icon}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{reason.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{reason.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Center Image */}
                    <div className="hidden md:block">
                        <div className="relative rounded-[50px] overflow-hidden border-4 border-gray-800 shadow-2xl mx-auto w-full max-w-sm aspect-[3/4]">
                            <img
                                src={ABOUT_SECTION_IMAGE}
                                alt="TechnoFitters Engineering Diagram"
                                className="w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent pointer-events-none" />

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/40 cursor-pointer hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-12">
                        {REASONS.slice(2, 4).map((reason, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center md:text-left group"
                            >
                                <div className="inline-block p-4 rounded-full bg-white/5 mb-4 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-pink-500 transition-all duration-300">
                                    <div className="text-orange-500 text-2xl group-hover:text-white transition-colors">
                                        {reason.icon}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{reason.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{reason.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
