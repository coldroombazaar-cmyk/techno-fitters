'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const BRANDS = [
    {
        name: 'Cold Room Bazaar',
        logo: '/cold-room-bazaar.png',
        url: 'https://www.coldroombazaar.com/',
        color: 'text-blue-500'
    },
    {
        name: 'Fitter X',
        logo: '/fitter-x.png',
        url: 'https://fitterx.netlify.app/',
        color: 'text-indigo-600'
    },
    {
        name: 'Cold Storage List',
        logo: '/cold-storage-list.jpg',
        url: 'https://coldstoragelist.in/',
        color: 'text-green-600'
    }
];

export default function BrandsSection() {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-4">Our Brands</h2>
                    <p className="text-gray-500 text-lg">Trusted partners in the cold storage industry</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {BRANDS.map((brand, index) => (
                        <motion.a
                            key={index}
                            href={brand.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-6 group hover:border-brand-green/20 transition-all duration-300"
                        >
                            <div className="relative w-48 h-32 flex items-center justify-center overflow-hidden">
                                <img
                                    src={brand.logo}
                                    alt={`${brand.name} Logo`}
                                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="relative">
                                <h3 className={`text-xl font-bold ${brand.color} tracking-wide group-hover:text-brand-green transition-colors`}>
                                    {brand.name}
                                </h3>
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-green transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
