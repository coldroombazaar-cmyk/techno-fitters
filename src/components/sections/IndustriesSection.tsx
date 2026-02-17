'use client';

import { motion } from 'framer-motion';
import { FaPills, FaUtensils, FaTruck, FaWarehouse, FaLeaf, FaFlask } from 'react-icons/fa';

const INDUSTRIES = [
    { icon: <FaPills />, name: 'Pharmaceuticals' },
    { icon: <FaUtensils />, name: 'Food Processing' },
    { icon: <FaTruck />, name: 'Logistics & Distribution' },
    { icon: <FaWarehouse />, name: 'Large Scale Warehousing' },
    { icon: <FaLeaf />, name: 'Agriculture' },
    { icon: <FaFlask />, name: 'Research Labs' },
];

export default function IndustriesSection() {
    return (
        <section id="industries" className="section-padding bg-[#0D0B1A] border-t border-gray-800">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="text-center mb-16">
                    <span className="flex items-center justify-center gap-2 text-orange-500 font-bold tracking-widest text-sm uppercase mb-4">
                        <span className="w-2 h-2 rounded-full bg-orange-500" />
                        Industries
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Industries We Serve</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Specialized cooling solutions for sectors where temperature integrity is non-negotiable.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {INDUSTRIES.map((industry, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="flex flex-col items-center justify-center p-8 bg-white/5 border border-gray-800 rounded-2xl cursor-default group hover:bg-gradient-to-br hover:from-white/10 hover:to-white/5 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300"
                        >
                            <div className="text-4xl text-gray-500 mb-4 group-hover:text-orange-500 transition-colors duration-300">
                                {industry.icon}
                            </div>
                            <span className="text-sm font-bold text-gray-300 text-center group-hover:text-white transition-colors">
                                {industry.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
