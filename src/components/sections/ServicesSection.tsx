'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaIndustry, FaTools, FaSnowflake, FaDraftingCompass, FaWarehouse } from 'react-icons/fa';
import LeadFormModal from '../ui/LeadFormModal';
import type { LeadType } from '../ui/LeadFormModal';

const SERVICES = [
    {
        number: '01.',
        icon: <FaWarehouse />,
        title: 'Cold Storage Manufacturing',
        description: 'Custom-built modular cold rooms with high-density PUF panels for superior thermal efficiency.',
        details: 'We specialize in manufacturing state-of-the-art modular cold rooms designed for diverse industrial applications. Our high-density PUF (Polyurethane Foam) panels ensure optimal thermal insulation, reducing energy costs and maintaining precise temperature control. Whether for food processing, pharmaceuticals, or logistics, our cold storage solutions are built for durability and efficiency.'
    },
    {
        number: '02.',
        icon: <FaTools />,
        title: 'Renovation & Modernization',
        description: 'Upgrading legacy facilities with modern insulation, doors, and refrigeration systems.',
        details: 'Our renovation services breathe new life into aging cold storage facilities. We replace outdated insulation, install energy-efficient doors, and upgrade refrigeration systems to meet modern standards. This not only extends the lifespan of your infrastructure but also significantly improves operational efficiency and compliance with safety regulations.'
    },
    {
        number: '03.',
        icon: <FaDraftingCompass />,
        title: 'Health Check & Audits',
        description: 'Comprehensive thermal and energy audits to optimize performance and reduce operational costs.',
        details: 'Our comprehensive health checks and energy audits identify inefficiencies in your cold chain infrastructure. We analyze thermal performance, energy consumption, and equipment health to provide actionable recommendations. By optimizing your systems, we help you reduce operational costs and prevent unexpected breakdowns.'
    },
    {
        number: '04.',
        icon: <FaSnowflake />,
        title: 'Refrigeration Infrastructure',
        description: 'End-to-end design and installation of industrial refrigeration units and pipework.',
        details: 'We deliver complete industrial refrigeration solutions, from system design to installation. Our expertise covers ammonia and freon-based systems, ensuring robust and reliable cooling for large-scale operations. We integrate high-quality components and precise pipework to guarantee maximum performance and safety.'
    },
    {
        number: '05.',
        icon: <FaIndustry />,
        title: 'Turnkey Projects',
        description: 'From concept to commissioning – we handle civil, mechanical, and electrical integration.',
        details: 'Our turnkey project execution takes the stress out of building cold chain facilities. We manage every aspect of the project, including civil works, mechanical engineering, and electrical integration. From the initial concept to final commissioning, we ensure seamless coordination and timely delivery of your facility.'
    },
    {
        number: '06.',
        icon: <FaTools />,
        title: '24/7 Support & AMC',
        description: 'Round-the-clock technical support and annual maintenance contracts to ensure zero downtime.',
        details: 'We understand that downtime is not an option in the cold chain industry. Our 24/7 technical support and Annual Maintenance Contracts (AMC) ensure your systems run smoothly year-round. Our expert technicians are always on standby to resolve issues quickly and perform routine maintenance to prevent failures.'
    }
];

export default function ServicesSection() {
    const [modalType, setModalType] = useState<LeadType | null>(null);
    const [expandedService, setExpandedService] = useState<number | null>(null);

    const toggleService = (index: number) => {
        setExpandedService(expandedService === index ? null : index);
    };

    return (
        <section id="services" className="section-padding bg-[#0D0B1A] relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-20">
                    <div className="lg:w-2/3">
                        <span className="flex items-center gap-2 text-orange-500 font-bold tracking-widest text-sm uppercase mb-4">
                            <span className="w-2 h-2 rounded-full bg-orange-500" />
                            Services
                        </span>
                        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Our Exclusive <br /> Services
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl">
                            We deliver industrial-grade cold chain solutions tailored to your operational requirements. From design to installation, we cover it all.
                        </p>
                    </div>
                    <div className="mt-8 lg:mt-0">
                        <button
                            onClick={() => setModalType('consultant')}
                            className="bg-gradient-to-r from-orange-400 to-pink-500 px-8 py-3 rounded-full text-white font-bold uppercase text-sm tracking-wider shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
                        >
                            All Services
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {SERVICES.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative flex flex-col border-b border-gray-800 pb-8 hover:border-gray-600 transition-colors"
                        >
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between cursor-pointer" onClick={() => toggleService(index)}>
                                <div className="flex items-center gap-8 md:w-3/4">
                                    <span className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 font-outline-2 group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
                                        {service.number}
                                    </span>
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-500 text-base max-w-xl">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 md:mt-0">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleService(index);
                                        }}
                                        className="px-6 py-2 rounded-full border border-gray-700 text-white text-sm font-semibold uppercase hover:bg-white hover:text-black transition-all duration-300 opacity-100 md:opacity-0 group-hover:opacity-100 md:translate-x-4 group-hover:translate-x-0"
                                    >
                                        {expandedService === index ? 'Read Less' : 'Read More'}
                                    </button>
                                </div>
                            </div>

                            <AnimatePresence>
                                {expandedService === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-6 pl-0 md:pl-[calc(4rem+2rem)] lg:pl-[calc(6rem+2rem)] max-w-3xl">
                                            <p className="text-gray-300 text-lg leading-relaxed border-l-2 border-orange-500 pl-4 bg-white/5 p-4 rounded-r-xl">
                                                {service.details}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
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
