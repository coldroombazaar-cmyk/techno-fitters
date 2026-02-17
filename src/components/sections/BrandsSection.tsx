'use client';

import { motion } from 'framer-motion';

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
        <section className="section-padding bg-[#0D0B1A] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000000] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center relative z-10">
                <span className="flex items-center justify-center gap-2 text-orange-500 font-bold tracking-widest text-sm uppercase mb-4">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    Trusted Partners
                </span>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Brands</h2>
                    <p className="text-gray-400 text-lg">Trusted partners in the cold storage industry</p>
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
                            whileHover={{ y: -5 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 rounded-2xl p-8 border border-gray-800 flex flex-col items-center justify-center gap-6 group hover:border-orange-500/50 hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative w-48 h-32 flex items-center justify-center bg-white rounded-xl p-4">
                                <img
                                    src={brand.logo}
                                    alt={`${brand.name} Logo`}
                                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-orange-500 transition-colors">
                                    {brand.name}
                                </h3>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
