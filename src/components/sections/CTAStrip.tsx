'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTAStrip() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-green to-brand-ripple opacity-20" />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-6xl font-light text-white mb-8 leading-tight">
                        Ready to Build Your <br />
                        <span className="font-medium">Cold Infrastructure?</span>
                    </h2>
                    <p className="text-white/80 text-xl mb-10 font-light">
                        We engineer the perfect environment for your products. Let's discuss your project.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="#contact"
                            className="px-8 py-4 bg-white text-brand-green font-bold tracking-wide rounded hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-white/20"
                        >
                            START A PROJECT
                        </Link>
                        <Link
                            href="#services"
                            className="px-8 py-4 border border-white/30 text-white font-medium tracking-wide rounded hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                        >
                            VIEW SERVICES
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
