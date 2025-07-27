import React from 'react';
import siteData from '@/data/site-data';

export default function Page() {
    const { services } = siteData;

    // Default colors for service icons
    const serviceColors: Record<string, string> = {
        'Web Applications': '#61DAFB',
        'Custom Software Solutions': '#4F46E5',
        'Mobile Apps (Android & iOS)': '#10B981',
        'Cloud Services': '#3B82F6',
        'UI/UX Design': '#8B5CF6',
    };

    return (
        <section id="services" className="min-h-screen flex items-center justify-center px-6 py-20">
            <div className="mx-auto max-w-6xl flex flex-col items-center">
                <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-center text-4xl font-bold text-transparent">
                    Services I Provide
                </h2>
                                <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-600">
                    Professional solutions tailored to your needs
                </p>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <div
                            key={index}
                                                        className="group relative transform rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-blue-500/30 hover:shadow-2xl hover:ring-2 hover:ring-blue-500/20"
                        >
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <div className="relative z-10">
                                <div
                                                                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 transition-colors duration-300 group-hover:bg-blue-500/20"
                                    style={{
                                        backgroundColor: `${serviceColors[service.name] || '#3B82F6'}10`,
                                    }}
                                >
                                    {React.createElement(service.icon, {
                                        className:
                                            'text-2xl transition-all duration-300 hover:scale-125 hover:rotate-12 hover:text-white',
                                        style: {
                                            color: serviceColors[service.name] || '#3B82F6',
                                            filter: 'drop-shadow(0 0 4px rgba(99, 102, 241, 0.5))',
                                        },
                                    })}
                                </div>
                                                                <h4 className="mb-2 text-lg font-semibold text-gray-900">
                                    {service.name}
                                </h4>
                                                                <p className="text-sm text-gray-600">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
