export default function PrivacyPolicy() {
    return (
        <div className="bg-[#050505] text-white pt-32 pb-24">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">Privacy <span className="font-medium text-brand-green">Policy</span></h1>
                <p className="text-white/40 mb-12">Last Updated: February 16, 2026</p>

                <div className="space-y-12 text-white/70 leading-relaxed font-light">
                    <section>
                        <p>
                            TechnoFitters respects your privacy and is committed to protecting the information you share with us. This policy explains how we collect, use, and safeguard your data when you visit our website or communicate with our team.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium text-white mb-4">Information We Collect</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Name and company name</li>
                            <li>Phone number and Email address</li>
                            <li>Project or service requirements</li>
                            <li>Any details submitted through contact forms or emails</li>
                        </ul>
                        <p className="mt-4">We collect only the information necessary to respond to inquiries and provide services.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium text-white mb-4">How We Use Your Information</h2>
                        <p>Your information may be used to:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Respond to requests or quotations</li>
                            <li>Provide technical or commercial support</li>
                            <li>Improve our services and website</li>
                            <li>Send important updates related to your project</li>
                        </ul>
                        <p className="mt-4">We do not sell or rent your personal data to third parties.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium text-white mb-4">Data Protection</h2>
                        <p>
                            We implement reasonable technical and organizational measures to protect your data from unauthorized access, misuse, or disclosure. Our goal is to ensure your information remains confidential and secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium text-white mb-4">Third-Party Sharing</h2>
                        <p>
                            Information may be shared with trusted partners or vendors only when required to execute services or fulfill project needs. We ensure these parties also uphold strict data protection standards.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium text-white mb-4">Cookies & Analytics</h2>
                        <p>
                            Our website may use cookies or analytics tools to understand visitor behavior and improve user experience. These tools collect aggregated data and do not identify individuals personally.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium text-white mb-4">Your Rights</h2>
                        <p>You have the right to request access to your data, correct inaccurate details, or ask for the deletion of your information. Contact us anytime for such requests.</p>
                    </section>

                    <section className="pt-8 border-t border-white/10">
                        <h2 className="text-xl font-medium text-white mb-4">Contact for Privacy Matters</h2>
                        <p>For any privacy-related questions, please contact:</p>
                        <div className="mt-4 p-6 bg-white/5 rounded-xl border border-white/10">
                            <p className="font-medium text-white">TechnoFitters</p>
                            <p>Email: info@technofitters.in</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
