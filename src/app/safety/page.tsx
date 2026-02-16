import { FaHardHat, FaHandshake, FaShieldAlt, FaChartLine } from 'react-icons/fa';

export default function SafetyAndCompliance() {
    return (
        <div className="bg-[#050505] text-white pt-32 pb-24">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-light mb-8 tracking-tight">Safety & <span className="font-medium text-brand-green">Compliance</span></h1>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12">
                    <p className="text-xl text-white/80 leading-relaxed font-light italic">
                        "TechnoFitters is committed to maintaining the highest standards of safety, regulatory compliance, and responsible engineering practices across all projects."
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <section className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-start gap-4">
                        <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center text-brand-green text-2xl">
                            <FaHardHat />
                        </div>
                        <h2 className="text-xl font-medium text-white">Workplace Safety</h2>
                        <ul className="text-white/60 space-y-2 text-sm">
                            <li>• Following established safety procedures</li>
                            <li>• Providing appropriate protective equipment</li>
                            <li>• Training personnel in safe installation methods</li>
                            <li>• Conducting risk assessments before execution</li>
                        </ul>
                    </section>

                    <section className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-start gap-4">
                        <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center text-brand-green text-2xl">
                            <FaShieldAlt />
                        </div>
                        <h2 className="text-xl font-medium text-white">Regulatory Compliance</h2>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Our work is carried out in alignment with applicable local and national regulations, industry codes, and best practices relevant to refrigeration and cold storage systems.
                        </p>
                    </section>

                    <section className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-start gap-4">
                        <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center text-brand-green text-2xl">
                            <FaHandshake />
                        </div>
                        <h2 className="text-xl font-medium text-white">Quality Standards</h2>
                        <p className="text-white/60 text-sm leading-relaxed">
                            We aim to use reliable materials, proper installation techniques, and systematic inspections to ensure durable and efficient outcomes for every facility.
                        </p>
                    </section>

                    <section className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-start gap-4">
                        <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center text-brand-green text-2xl">
                            <FaChartLine />
                        </div>
                        <h2 className="text-xl font-medium text-white">Continuous Improvement</h2>
                        <p className="text-white/60 text-sm leading-relaxed">
                            We continuously improve our processes through comprehensive training, performance evaluation, and the adoption of modern refrigeration technologies.
                        </p>
                    </section>
                </div>

                <div className="text-center pt-8 border-t border-white/10">
                    <p className="text-2xl font-light text-white">
                        Safety is not optional — it is <span className="text-brand-green font-medium">fundamental</span> to every project we undertake.
                    </p>
                </div>
            </div>
        </div>
    );
}
