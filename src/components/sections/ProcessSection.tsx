'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const STEPS = [
    {
        number: '01.',
        title: 'Identify Client Requirements',
        description: 'We analyze your requirements, load calculations, and site conditions.'
    },
    {
        number: '02.',
        title: 'Craft Innovative Solutions',
        description: 'Engineering optimized layouts and thermal load planning using CAD.'
    },
    {
        number: '03.',
        title: 'Develop and Deploy Projects',
        description: 'Precision manufacturing of panels and refrigeration units.'
    },
    {
        number: '04.',
        title: 'Review and Improve Performance',
        description: 'Expert on-site assembly, sealing, and system commissioning.'
    }
];

export default function ProcessSection() {
    return (
        <section className="section-padding bg-[#0D0B1A] relative overflow-hidden">
            {/* Background Hex Pattern (Optional simulation) */}
            <div className="absolute inset-0 bg-[url('/assets/hex-pattern.png')] opacity-5 pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    {/* Left Steps Grid */}
                    <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {STEPS.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-8 rounded-2xl border border-gray-800 transition-all duration-300 hover:shadow-2xl hover:border-gray-700 bg-white/5 backdrop-blur-sm group
                                    ${index === 0 ? 'bg-gradient-to-br from-orange-400 to-pink-500 border-none' : ''}
                                    ${index === 3 ? 'bg-gradient-to-br from-purple-500 to-indigo-500 border-none' : ''}
                                `}
                            >
                                <div className={`text-4xl font-bold mb-4 font-outline-2 
                                    ${index === 0 || index === 3 ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600'}
                                `}>
                                    {step.number}
                                </div>
                                <h3 className={`text-xl font-bold mb-3 ${index === 0 || index === 3 ? 'text-white' : 'text-white'}`}>
                                    {step.title}
                                </h3>
                                <p className={`text-sm leading-relaxed ${index === 0 || index === 3 ? 'text-white/90' : 'text-gray-400'}`}>
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Content */}
                    <div className="lg:w-1/2 pt-12">
                        <span className="flex items-center gap-2 text-orange-500 font-bold tracking-widest text-sm uppercase mb-4">
                            <span className="w-2 h-2 rounded-full bg-orange-500" />
                            Our Process
                        </span>
                        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Strategic Steps to <br />
                            Reach Your <span className="text-white">Digital Goals</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Our streamlined process is designed to help you achieve your digital goals efficiently. We start by understanding your unique needs, then craft tailored solutions, followed by development and implementation. Finally, we evaluate and optimize our efforts to ensure ongoing success and growth for your brand.
                        </p>
                        <Link href="#contact" className="bg-gradient-to-r from-orange-400 to-pink-500 px-10 py-4 rounded-full text-white font-bold uppercase text-sm tracking-widest shadow-lg hover:shadow-orange-500/20 hover:-translate-y-1 transition-all duration-300 inline-block">
                            Get Started
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
