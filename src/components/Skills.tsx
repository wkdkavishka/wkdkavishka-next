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

  const categoryTitles = {
    frontend: 'Frontend',
    backend: 'Backend',
    devops: 'DevOps & Cloud',
    other: 'Other'
  };

  return (
    <section id="skills" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Skills & Technologies</h2>
        
        {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
          <div key={category} className="mb-12">
            <h3 className="text-xl font-semibold mb-6 text-gray-700 dark:text-gray-300">
              {categoryTitles[category as keyof typeof categoryTitles] || category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categorySkills.map((skill, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  {React.createElement(skill.icon, { 
                    className: "text-3xl mb-2",
                    style: { 
                      color: getSkillColor(skill.name) 
                    } 
                  })}
                  <span className="text-sm font-medium text-center">{skill.name}</span>
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

  return colors[skillName] || '#6B7280'; // Default to gray-500 if no specific color
}
