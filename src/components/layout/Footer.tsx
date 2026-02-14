import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background border-t border-white/10 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div>
                        <Link href="/" className="inline-block mb-6 group">
                            <div className="flex items-center gap-3">
                                <div className="relative w-12 h-12 overflow-hidden bg-white/10 rounded-lg p-1">
                                    <Image
                                        src="/TechnoFitters.png"
                                        alt="TechnoFitters Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-2xl font-medium tracking-tight text-white group-hover:text-brand-green transition-colors">
                                    Techno<span className="text-white/60">Fitters</span>
                                </span>
                            </div>
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
                            Complete industrial cold chain solutions. Engineering precision for critical environments.
                        </p>
                        <div className="flex gap-4">
                            <SocialLink href="#" icon={<FaLinkedin />} label="LinkedIn" />
                            <SocialLink href="#" icon={<FaTwitter />} label="Twitter" />
                            <SocialLink href="#" icon={<FaInstagram />} label="Instagram" />
                        </div>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 className="text-white font-medium mb-6 tracking-wide">Services</h4>
                        <ul className="space-y-3">
                            <FooterLink href="#manufacturing">Cold Storage Manufacturing</FooterLink>
                            <FooterLink href="#renovation">Renovation & Modernization</FooterLink>
                            <FooterLink href="#audit">Performance Audits</FooterLink>
                            <FooterLink href="#turnkey">Turnkey Projects</FooterLink>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 className="text-white font-medium mb-6 tracking-wide">Company</h4>
                        <ul className="space-y-3">
                            <FooterLink href="#about">About Us</FooterLink>
                            <FooterLink href="#projects">Projects</FooterLink>
                            <FooterLink href="#careers">Careers</FooterLink>
                            <FooterLink href="#contact">Contact</FooterLink>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-white font-medium mb-6 tracking-wide">Contact</h4>
                        <address className="not-italic text-white/60 text-sm space-y-3">
                            <p>H-58, Tetutala Road, Molla Para,</p>
                            <p>PO - Kajipara, Madhyamgram,</p>
                            <p>Kolkata - 700125, West Bengal</p>
                            <p className="mt-4 text-white">
                                <a href="tel:+917860000929" className="hover:text-brand-green transition-colors">+91 786-0000-929</a>
                            </p>
                            <p>
                                <a href="mailto:technofitters@gmail.com" className="hover:text-brand-green transition-colors">technofitters@gmail.com</a>
                            </p>
                        </address>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
                    <p>&copy; {currentYear} TechnoFitters. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link href={href} className="text-sm text-white/60 hover:text-brand-leaf transition-colors duration-200">
                {children}
            </Link>
        </li>
    );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            aria-label={label}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-brand-green hover:text-white transition-all duration-300"
        >
            {icon}
        </a>
    );
}
