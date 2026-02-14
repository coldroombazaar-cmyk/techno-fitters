'use client';

import { motion } from 'framer-motion';

const STEPS = [
    {
        number: '01',
        title: 'Consultation',
        description: 'We analyze your requirements, load calculations, and site conditions.'
    },
    {
        number: '02',
        title: 'Design',
        description: 'Engineering optimized layouts and thermal load planning using CAD.'
    },
    {
        number: '03',
        title: 'Fabrication',
        description: 'Precision manufacturing of panels and refrigeration units.'
    },
    {
        number: '04',
        title: 'Installation',
        description: 'Expert on-site assembly, sealing, and system commissioning.'
    },
    {
        number: '05',
        title: 'Support',
        description: 'Ongoing maintenance checks and 24/7 technical support.'
    }
];

export default function ProcessSection() {
    return (
        <section id="process" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="text-brand-green font-medium tracking-widest uppercase mb-2">Our Methodology</p>
                    <h2 className="text-3xl md:text-5xl font-light text-gray-900">Streamlined Execution</h2>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200" />

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {STEPS.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative pt-8 md:pt-16 group"
                            >
                                {/* Dot */}
                                <div className="hidden md:block absolute top-[43px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-brand-green group-hover:bg-brand-green transition-colors z-10 shadow-sm" />

                                <div className="md:text-center">
                                    <span className="text-6xl font-light text-gray-100 absolute -top-4 md:top-4 left-0 md:left-1/2 md:-translate-x-1/2 select-none group-hover:text-brand-green/5 transition-colors">
                                        {step.number}
                                    </span>
                                    <h3 className="text-xl font-medium text-gray-900 mb-3 relative z-10">{step.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
