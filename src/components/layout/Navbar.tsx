'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import QuoteModal from '../ui/QuoteModal';

const NAV_LINKS = [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '/about' },
    { name: 'Industries', href: '#industries' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-black/70 border-b border-black/20 shadow-lg'
                    : 'bg-black/30 backdrop-blur-2xl border-b border-white/10'
                    }`}
            >
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className={`relative w-10 h-10 overflow-hidden rounded-lg p-1 transition-colors ${scrolled ? 'bg-black/40' : 'bg-white/10'}`}>
                            <img
                                src="/TechnoFitters.png"
                                alt="TechnoFitters Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className={`text-xl font-medium tracking-tight transition-colors duration-300 ${scrolled ? 'text-white' : 'text-white'} group-hover:text-brand-green`}>
                            Techno<span className={`transition-colors ${scrolled ? 'text-white/80' : 'text-white/70'}`}>Fitters</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors duration-200 tracking-wide ${scrolled ? 'text-white hover:text-white' : 'text-white/90 hover:text-white'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <button
                            onClick={() => setIsQuoteModalOpen(true)}
                            className="btn-primary rounded-none text-sm px-6 py-2.5"
                        >
                            GET QUOTE
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`md:hidden p-2 transition-colors ${scrolled ? 'text-white hover:text-white' : 'text-white/90 hover:text-white'}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span className="sr-only">Open menu</span>
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <span className={`w-full h-0.5 bg-current transform transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <span className={`w-full h-0.5 bg-current transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                            <span className={`w-full h-0.5 bg-current transform transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white border-b border-gray-100 overflow-hidden shadow-xl"
                        >
                            <nav className="flex flex-col p-6 gap-4">
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-lg font-medium text-gray-700 hover:text-brand-green transition-colors py-2 border-b border-gray-100"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <button
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        setIsQuoteModalOpen(true);
                                    }}
                                    className="mt-4 btn-primary text-center w-full"
                                >
                                    GET QUOTE
                                </button>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            <QuoteModal
                isOpen={isQuoteModalOpen}
                onClose={() => setIsQuoteModalOpen(false)}
                type="quote"
            />
        </>
    );
}
