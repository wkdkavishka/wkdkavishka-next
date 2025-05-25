import React from "react";
import siteData from "@/data/site-data";

export const Skills = () => {
  const { skills } = siteData;
  
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const serviceCategories = {
    frontend: 'Frontend Development',
    backend: 'Backend Development',
    devops: 'DevOps & Cloud Solutions',
    other: 'Additional Services'
  };

  const serviceDescriptions: Record<string, string> = {
    'React': 'Building responsive and interactive user interfaces with modern React',
    'TypeScript': 'Type-safe JavaScript for better developer experience',
    'JavaScript': 'Full-stack JavaScript development',
    'Next.js': 'Server-side rendering and static site generation',
    'Node.js': 'Scalable backend services and APIs',
    'Python': 'Backend development and scripting',
    'GraphQL': 'Efficient data querying with GraphQL APIs',
    'Docker': 'Containerization and deployment solutions',
    'PostgreSQL': 'Relational database design and optimization',
    'MongoDB': 'NoSQL database solutions',
    'Tailwind CSS': 'Rapid UI development with utility-first CSS',
  };

  return (
    <section id="services" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Services I Provide
        </h2>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Professional solutions tailored to your needs
        </p>
        
        {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
          <div key={category} className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-200">
              {serviceCategories[category as keyof typeof serviceCategories] || category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorySkills.map((skill, index) => (
                <div 
                  key={index} 
                  className="group relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] border border-gray-100 dark:border-gray-700 hover:border-blue-500/30 hover:ring-2 hover:ring-blue-500/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 mb-4 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 dark:group-hover:bg-blue-500/30 transition-colors duration-300">
                      {React.createElement(skill.icon, { 
                        className: "text-2xl",
                        style: { 
                          color: getSkillColor(skill.name),
                          filter: 'drop-shadow(0 0 4px rgba(99, 102, 241, 0.5))'
                        } 
                      })}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {skill.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {serviceDescriptions[skill.name] || 'Professional service with expertise in this technology'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Helper function to get consistent colors for skills
function getSkillColor(skillName: string): string {
  const colors: Record<string, string> = {
    'React': '#61DAFB',
    'TypeScript': '#3178C6',
    'JavaScript': '#F7DF1E',
    'Next.js': '#000000',
    'Node.js': '#339933',
    'Python': '#3776AB',
    'GraphQL': '#E10098',
    'Docker': '#2496ED',
    'PostgreSQL': '#336791',
    'MongoDB': '#47A248',
    'Tailwind CSS': '#06B6D4',
  };

  return colors[skillName] || '#6B7280';
}
