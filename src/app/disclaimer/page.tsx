export default function Disclaimer() {
    return (
        <div className="bg-[#050505] text-white pt-32 pb-24">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-light mb-8 tracking-tight">Legal <span className="font-medium text-brand-green">Disclaimer</span></h1>

                <div className="space-y-12 text-white/70 leading-relaxed font-light">
                    <section className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                        <p className="text-lg">
                            The information provided on this website is for general informational purposes only. While we strive to keep content accurate and up to date, TechnoFitters makes no guarantees regarding:
                        </p>
                        <ul className="list-disc pl-6 mt-6 space-y-2 text-white/60">
                            <li>Completeness or accuracy of information</li>
                            <li>Reliability of third-party data</li>
                            <li>Suitability for specific applications</li>
                            <li>Availability of services in all regions</li>
                        </ul>
                        <p className="mt-8 text-white font-medium italic">
                            Any reliance you place on such information is strictly at your own risk.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium text-white mb-4">Technical Specifications</h2>
                        <p>
                            Technical specifications, illustrations, and service descriptions on this website are for conceptual understanding and may vary significantly depending on actual project conditions, site constraints, and final engineering designs.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium text-white mb-4">Limitation of Liability</h2>
                        <p>
                            To the fullest extent permitted by law, TechnoFitters shall not be liable for any indirect, incidental, special, or consequential damages arising from:
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2 text-white/60">
                            <li>Use or inability to use the website</li>
                            <li>Reliance on website information</li>
                            <li>Technical delays or interruptions</li>
                            <li>Errors or omissions in content</li>
                        </ul>
                    </section>

                    <section className="bg-brand-green/5 border border-brand-green/20 p-8 rounded-2xl">
                        <h2 className="text-xl font-medium text-white mb-4">Contractual Agreements</h2>
                        <p>
                            For all contracted services, project responsibilities and liabilities will be governed exclusively by the specific terms and conditions specified in the signed agreements between TechnoFitters and the client.
                        </p>
                    </section>

                    <section className="pt-8 border-t border-white/10 text-center">
                        <p className="text-sm text-white/40">
                            &copy; {new Date().getFullYear()} TechnoFitters. All rights reserved.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
