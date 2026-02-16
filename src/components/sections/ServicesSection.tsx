'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaIndustry, FaTools, FaSnowflake, FaDraftingCompass, FaWarehouse } from 'react-icons/fa';
import LeadFormModal from '../ui/LeadFormModal';
import type { LeadType } from '../ui/LeadFormModal';

const SERVICES = [
    {
        icon: <FaWarehouse />,
        title: 'Cold Storage Manufacturing',
        description: 'Custom-built modular cold rooms with high-density PUF panels for superior thermal efficiency.'
    },
    {
        icon: <FaTools />,
        title: 'Renovation & Modernization',
        description: 'Upgrading legacy facilities with modern insulation, doors, and refrigeration systems.'
    },
    {
        icon: <FaDraftingCompass />,
        title: 'Health Check & Audits',
        description: 'Comprehensive thermal and energy audits to optimize performance and reduce operational costs.'
    },
    {
        icon: <FaSnowflake />,
        title: 'Refrigeration Infrastructure',
        description: 'End-to-end design and installation of industrial refrigeration units and pipework.'
    },
    {
        icon: <FaIndustry />,
        title: 'Turnkey Projects',
        description: 'From concept to commissioning – we handle civil, mechanical, and electrical integration.'
    },
    {
        icon: <FaTools />, // Reusing Tools icon or maybe another one like FaHeadset if available, but let's stick to imports. FaTools is used. FaLeaf? FaShieldAlt? imported in WhyChooseUs. Services imports: FaIndustry, FaTools, FaSnowflake, FaDraftingCompass, FaWarehouse. I can reuse FaTools or add FaHeadset.
        title: '24/7 Support & AMC',
        description: 'Round-the-clock technical support and annual maintenance contracts to ensure zero downtime.'
    }
];

export default function ServicesSection() {
    const [modalType, setModalType] = useState<LeadType | null>(null);

    return (
        <section id="services" className="py-24 bg-gray-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-green/20 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-6">Precision Engineering Services</h2>
                    <p className="text-gray-600 text-lg mb-8">
                        We deliver industrial-grade cold chain solutions tailored to your operational requirements.
                    </p>
                    <button
                        onClick={() => setModalType('consultant')}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-brand-green hover:bg-brand-leaf text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-brand-green/20 hover:shadow-brand-green/40 hover:-translate-y-1"
                    >
                        Get Consultant <span className="text-xl">→</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SERVICES.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group p-8 bg-white border border-gray-200 hover:border-brand-green/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className="text-brand-blue text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-brand-green transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {modalType && (
                <LeadFormModal
                    type={modalType}
                    isOpen={true}
                    onClose={() => setModalType(null)}
                />
            )}
        </section>
    );
}
