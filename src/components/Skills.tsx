import React from "react";
import siteData from "@/data/site-data";

export const Skills = () => {
  const { services } = siteData;

  // Default colors for service icons
  const serviceColors: Record<string, string> = {
    "Web Applications": "#61DAFB",
    "Custom Software Solutions": "#4F46E5",
    "Mobile Apps (Android & iOS)": "#10B981",
    "Cloud Services": "#3B82F6",
    "UI/UX Design": "#8B5CF6",
  };

  return (
    <section id="services" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Services I Provide
        </h2>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Professional solutions tailored to your needs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] border border-gray-100 dark:border-gray-700 hover:border-blue-500/30 hover:ring-2 hover:ring-blue-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div
                  className="w-12 h-12 mb-4 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 dark:group-hover:bg-blue-500/30 transition-colors duration-300"
                  style={{
                    backgroundColor: `${
                      serviceColors[service.name] || "#3B82F6"
                    }10`,
                  }}
                >
                  {React.createElement(service.icon, {
                    className: "text-2xl",
                    style: {
                      color: serviceColors[service.name] || "#3B82F6",
                      filter: "drop-shadow(0 0 4px rgba(99, 102, 241, 0.5))",
                    },
                  })}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {service.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
