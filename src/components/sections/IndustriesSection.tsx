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
        <section id="industries" className="pt-12 md:pt-16 pb-24 bg-white border-t border-gray-100">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-6">Industries We Serve</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Specialized cooling solutions for sectors where temperature integrity is non-negotiable.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {INDUSTRIES.map((industry, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05, borderColor: 'var(--brand-green)' }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl cursor-default group hover:shadow-lg transition-all duration-300"
                        >
                            <div className="text-3xl text-gray-400 mb-4 group-hover:text-brand-green transition-colors duration-300">
                                {industry.icon}
                            </div>
                            <span className="text-sm font-medium text-gray-700 text-center group-hover:text-gray-900 transition-colors">
                                {industry.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
