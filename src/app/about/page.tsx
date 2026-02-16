import { motion } from 'framer-motion';
import { FaBullseye, FaLightbulb, FaCheckCircle, FaIndustry, FaRocket } from 'react-icons/fa';

export default function AboutPage() {
    return (
        <div className="bg-[#050505] text-white pt-32 pb-24">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Hero section for About */}
                <div className="mb-16">
                    <h1 className="text-4xl md:text-6xl font-light mb-8 tracking-tight">About <span className="font-medium text-brand-green">TechnoFitters</span></h1>
                    <p className="text-xl text-white/70 leading-relaxed font-light mb-8">
                        TechnoFitters is a specialized engineering and service company delivering end-to-end cold chain and refrigeration infrastructure solutions across India.
                    </p>
                    <div className="w-24 h-1 bg-brand-green mb-12"></div>
                </div>

                {/* Who We Are */}
                <section className="mb-20">
                    <h2 className="text-2xl font-medium mb-6 flex items-center gap-3">
                        <FaIndustry className="text-brand-green" /> Who We Are
                    </h2>
                    <div className="space-y-6 text-white/70 leading-relaxed">
                        <p>
                            We work with food processors, pharmaceutical companies, logistics operators, distributors, and industrial facilities that depend on precise, reliable temperature control.
                        </p>
                        <p>
                            From new cold storage construction to modernization of existing facilities, our team combines practical field expertise with disciplined engineering standards to deliver projects that perform today and remain efficient for years to come.
                        </p>
                        <p className="text-white font-medium italic">
                            We are builders, problem solvers, and long-term partners.
                        </p>
                    </div>
                </section>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <h2 className="text-xl font-medium mb-4 flex items-center gap-3">
                            <FaBullseye className="text-brand-green" /> Our Mission
                        </h2>
                        <p className="text-white/70 leading-relaxed">
                            To design, build, and maintain dependable cold chain systems that help businesses protect product quality, reduce losses, and operate with maximum efficiency.
                        </p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <h2 className="text-xl font-medium mb-4 flex items-center gap-3">
                            <FaLightbulb className="text-brand-green" /> Our Vision
                        </h2>
                        <p className="text-white/70 leading-relaxed">
                            To become a leading force in the modernization of India’s refrigeration infrastructure by bringing together engineering excellence, advanced technology, and responsive service.
                        </p>
                    </div>
                </div>

                {/* What We Do */}
                <section className="mb-20">
                    <h2 className="text-2xl font-medium mb-8">What We Do</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {[
                            "Cold storage design & manufacturing",
                            "Supply and installation of PUF panels",
                            "Refrigeration equipment integration",
                            "Renovation & capacity upgrades",
                            "Preventive maintenance & emergency service",
                            "Health check, audits & performance optimization",
                            "Flashing and structural finishing work",
                            "Turnkey project execution"
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3 text-white/70">
                                <FaCheckCircle className="text-brand-green mt-1 flex-shrink-0" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="mb-20">
                    <h2 className="text-2xl font-medium mb-8">Why Choose TechnoFitters</h2>
                    <div className="space-y-8">
                        {[
                            { title: "Industry Expertise", desc: "Our team understands the technical, operational, and compliance challenges of temperature-controlled environments." },
                            { title: "End-to-End Capability", desc: "From concept to commissioning and ongoing service, we manage the complete process." },
                            { title: "Quality & Reliability", desc: "We use proven materials, skilled workmanship, and systematic project execution." },
                            { title: "Fast Response", desc: "We prioritize uptime and understand how critical refrigeration is to your business." }
                        ].map((item, i) => (
                            <div key={i} className="group">
                                <h3 className="text-lg font-medium text-white mb-2 group-hover:text-brand-green transition-colors">{item.title}</h3>
                                <p className="text-white/60 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Banner */}
                <div className="bg-gradient-to-r from-brand-green/20 to-transparent p-12 rounded-3xl border border-white/10 text-center">
                    <h2 className="text-2xl font-medium mb-4">Ready to start your project?</h2>
                    <p className="text-white/60 mb-8">Let's discuss how we can build your cold infrastructure.</p>
                    <a href="mailto:info@technofitters.in" className="inline-block bg-brand-green text-white px-8 py-4 rounded-lg font-medium hover:bg-brand-leaf transition-all">
                        info@technofitters.in
                    </a>
                </div>
            </div>
        </div>
    );
}
