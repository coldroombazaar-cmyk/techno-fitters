'use client';

import { motion } from 'framer-motion';
import { FaShieldAlt, FaLeaf, FaStopwatch, FaCogs } from 'react-icons/fa';

const REASONS = [
    {
        icon: <FaCogs />,
        title: 'Precision Installation',
        description: 'Zero-tolerance alignment for maximum thermal integrity and structural longevity.'
    },
    {
        icon: <FaLeaf />,
        title: 'Energy Efficiency',
        description: 'Optimized insulation and door systems reduce operational power consumption by up to 30%.'
    },
    {
        icon: <FaShieldAlt />,
        title: 'Compliance & Safety',
        description: 'Built to meet international HACCP, GMP, and ISO safety standards for critical storage.'
    },
    {
        icon: <FaStopwatch />,
        title: 'Rapid Deployment',
        description: 'Modular pre-fabrication allows for faster on-site assembly without compromising quality.'
    }
];

export default function WhyChooseUsSection() {
    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="container mx-auto px-8 md:px-12 lg:px-20">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight"
                        >
                            Why Leading Brands <br />
                            <span className="text-brand-green">Trust TechnoFitters</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-600 text-lg mb-8 max-w-xl"
                        >
                            We don`t just build cold rooms; we engineer reliability. Our focus on technical excellence ensures your assets are protected around the clock.
                        </motion.p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {REASONS.map((reason, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (index * 0.1) }}
                                    className="flex gap-4 items-start"
                                >
                                    <div className="text-brand-green text-2xl mt-1">{reason.icon}</div>
                                    <div>
                                        <h4 className="text-gray-900 font-medium mb-1">{reason.title}</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">{reason.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-square md:aspect-video lg:aspect-square bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100"
                        >
                            <img
                                src="/assets/engineering-design.png"
                                alt="TechnoFitters Engineering Diagram"
                                className="w-full h-full object-cover"
                            />
                            {/* Optional: Subtle gradient overlay if image needs text contrast, but generic diagram is fine raw */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
