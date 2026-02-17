'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const STATS = [
    { label: 'Years Experience', value: '25+' },
    { label: 'Project Completed', value: '8k' },
    { label: 'Happy Clients', value: '7k' },
];

export default function AboutCompanySection() {
    return (
        <section className="section-padding bg-[#0D0B1A] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-900/10 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left Content */}
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="flex items-center gap-2 text-orange-500 font-bold tracking-widest text-sm uppercase mb-4">
                                <span className="w-2 h-2 rounded-full bg-orange-500" /> {/* grid/dot icon simulation */}
                                About Company
                            </span>
                            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
                                Who is <span className="text-white">TechnoFitters?</span> {/* Kept white as per request for bold text matching */}
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                            </p>

                            <div className="flex items-center gap-6 mb-12">
                                <Link href="/about" className="btn-primary">
                                    Read More
                                </Link>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500">
                                        <img src="https://i.pravatar.cc/100?img=11" alt="Founder" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">Siddique Ali</h4>
                                        <p className="text-gray-500 text-xs">Co Founder</p>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px w-full bg-gray-800 mb-12 relative overflow-hidden">
                                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-orange-500 text-xl">*</div>
                            </div>

                            <div className="flex justify-between md:justify-start gap-12 md:gap-24">
                                {STATS.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 font-outline-2">
                                            {stat.value}
                                        </h3>
                                        <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Image Composition */}
                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative z-10"
                        >
                            <div className="relative">
                                {/* Main rounded image mask simulation */}
                                <div className="rounded-[40px] overflow-hidden border-4 border-gray-800/50 shadow-2xl relative">
                                    {/* Placeholder for the office/team image */}
                                    <div className="aspect-[4/3] bg-gray-800 relative group overflow-hidden">
                                        <img src="/assets/engineering-diagram.png" alt="Team" className="w-full h-full object-cover opacity-80 mix-blend-overlay" />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 to-transparent" />
                                    </div>
                                </div>

                                {/* Floating circular element */}
                                <div className="absolute -top-12 -left-12 bg-[#0D0B1A] rounded-full p-4 border border-gray-800 shadow-xl hidden md:block">
                                    <div className="w-32 h-32 rounded-full border border-orange-500/30 flex items-center justify-center relative animate-spin-slow">
                                        <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 text-white fill-current">
                                            <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
                                            <text className="text-[10px] uppercase tracking-widest text-gray-400">
                                                <textPath href="#curve">Digital Marketing Agency Kit Template</textPath>
                                            </text>
                                        </svg>
                                        <div className="text-orange-500 text-2xl font-bold">↗</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
