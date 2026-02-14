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
        <section id="industries" className="py-24 bg-background/50 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-light text-white mb-6">Industries We Serve</h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
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
                            className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-xl cursor-default group hover:bg-white/10 transition-colors"
                        >
                            <div className="text-3xl text-white/40 mb-4 group-hover:text-brand-leaf transition-colors duration-300">
                                {industry.icon}
                            </div>
                            <span className="text-sm font-medium text-white/80 text-center group-hover:text-white transition-colors">
                                {industry.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
