import siteData from '@/data/site-data';
import { CardComp } from '@/components/CardComp';

export default function Page() {
    const { projects } = siteData;

    if (!projects || projects.length === 0) {
        return null;
    }

    // Color variants for project cards
    const colorVariants = [
        'from-blue-600/5 to-purple-600/5',
        'from-green-600/5 to-blue-600/5',
        'from-purple-600/5 to-pink-600/5',
        'from-pink-600/5 to-red-600/5',
        'from-yellow-600/5 to-orange-600/5',
        'from-teal-600/5 to-cyan-600/5',
    ];

    // Border hover colors
    const borderHoverColors = [
        'hover:border-blue-500/30 hover:ring-2 hover:ring-blue-500/20',
        'hover:border-green-500/30 hover:ring-2 hover:ring-green-500/20',
        'hover:border-purple-500/30 hover:ring-2 hover:ring-purple-500/20',
        'hover:border-pink-500/30 hover:ring-2 hover:ring-pink-500/20',
        'hover:border-yellow-500/30 hover:ring-2 hover:ring-yellow-500/20',
        'hover:border-teal-500/30 hover:ring-2 hover:ring-teal-500/20',
    ];

    return (
        <section id="projects" className="min-h-screen items-center justify-center px-6 py-20">
            <div className="mx-auto flex max-w-6xl flex-col items-center">
                <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-center text-4xl font-bold text-transparent">
                    Featured Projects
                </h2>
                <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-400">
                    Some of my recent work and contributions
                </p>
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => {
                        const colorVariant = colorVariants[index % colorVariants.length];
                        const borderHover = borderHoverColors[index % borderHoverColors.length];

                        return (
                            <CardComp
                                key={project.id}
                                project={project}
                                colorVariant={colorVariant}
                                borderHover={borderHover}
                                index={index}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
