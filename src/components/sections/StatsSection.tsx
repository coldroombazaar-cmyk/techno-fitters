'use client';

import { motion } from 'framer-motion';

const STATS = [
    { label: 'Years Experience', value: '25+' },
    { label: 'Projects Delivered', value: '500+' },
    { label: 'Cooling Capacity (TR)', value: '10k+' },
    { label: 'Team Strength', value: '120+' },
];

export default function StatsSection() {
    return (
        <section className="py-20 bg-background border-b border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {STATS.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center"
                        >
                            <h3 className="text-4xl md:text-5xl font-light text-brand-leaf bg-clip-text text-transparent bg-gradient-to-br from-brand-leaf to-emerald-400 mb-2">
                                {stat.value}
                            </h3>
                            <p className="text-white/60 text-sm tracking-widest uppercase">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
