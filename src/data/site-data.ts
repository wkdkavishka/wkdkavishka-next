import { IconType } from 'react-icons';
import {
    FaReact,
    FaGithub,
    FaLinkedin,
    FaCode,
    FaMobileAlt,
    FaCloud,
    FaPalette,
    FaFacebook,
} from 'react-icons/fa';

export interface Skill {
    name: string;
    description: string;
    icon: IconType;
}

export interface CardCompIntf {
    id: string;
    title: string;
    description: string;
    tags: string[];
    link: string;
    image: string;
    github?: string;
}

export interface SocialLink {
    name: string;
    url: string;
    icon: IconType;
}

export interface TeamMemberCarouselCompIntf {
    id: string;
    name: string;
    role: string;
    company: string;
    image: string;
    testimonial: string;
    social: {
        linkedin: string;
        twitter: string;
        github: string;
    };
}

// personel
export interface PersonalData {
    name: string;
    title: string;
    location: string;
    email: string;
    profileImage: string;
    about: string[];
    resumeUrl: string;
}

// socialData
export interface SocialData {
    name: string;
    url: string;
    icon: IconType;
}

export interface SiteData {
    personal: PersonalData;
    services: Skill[];
    projects: CardCompIntf[];
    socialLinks: SocialData[];
    teamMembers: TeamMemberCarouselCompIntf[];
}

// Create the site data with proper typing
const siteData: SiteData = {
    personal: {
        name: 'W.K.D.Kavishka',
        title: 'Software Engineer | DevOps Engineer',
        location: 'Colombo, Sri Lanka',
        email: 'w.k.d.kavishka@gmail.com',
        profileImage: '/images/profile.webp',
        about: [
            'Take your business to the next level',
            'Taking on challenging projects and delivering exceptional software solutions.',
            'Focused on delivering high-quality, scalable applications that meet business needs.',
            'Building lasting client relationships through exceptional service and innovative solutions.',
            'Dedicated to excellence in every project and committed to client satisfaction.',
        ],
        resumeUrl: '/resume.pdf',
    },
    services: [
        {
            name: 'Web Applications',
            description:
                'Custom web applications built with modern technologies like React, Next.js, and TypeScript',
            icon: FaReact,
        },
        {
            name: 'Custom Software Solutions',
            description:
                'Tailored software solutions designed to meet your specific business needs',
            icon: FaCode,
        },
        {
            name: 'Mobile Apps (Android & iOS)',
            description: 'Cross-platform mobile applications for both Android and iOS platforms',
            icon: FaMobileAlt,
        },
        {
            name: 'Cloud Services',
            description: 'Cloud infrastructure setup, deployment, and management',
            icon: FaCloud,
        },
        {
            name: 'UI/UX Design',
            description: 'Beautiful and intuitive user interfaces with exceptional user experience',
            icon: FaPalette,
        },
    ],
    projects: [
        {
            id: 'project-1',
            title: 'E-Commerce Platform',
            description:
                'A full-stack e-commerce platform with user authentication, product catalog, shopping cart, and payment integration. Built with Next.js, TypeScript, and MongoDB.',
            tags: ['Next.js', 'TypeScript', 'MongoDB', 'Stripe', 'Tailwind CSS'],
            link: 'https://ecommerce-demo.wkdkavishka.vercel.app',
            github: 'https://github.com/wkdkavishka/ecommerce-platform',
            image: '/images/projects/project-1.jpg',
        },
        {
            id: 'project-2',
            title: 'Task Management App',
            description:
                'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Built with React, Node.js, and Socket.io.',
            tags: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Material-UI'],
            link: 'https://taskflow.wkdkavishka.vercel.app',
            github: 'https://github.com/wkdkavishka/task-management-app',
            image: '/images/projects/project-2.jpg',
        },
        {
            id: 'project-3',
            title: 'Recipe Finder',
            description:
                'A web application that helps users discover recipes based on available ingredients. Features include recipe search, filtering, and saving favorites. Built with Vue.js and the Spoonacular API.',
            tags: ['Vue.js', 'Vuex', 'Spoonacular API', 'Tailwind CSS'],
            link: 'https://recipe-finder.wkdkavishka.vercel.app',
            github: 'https://github.com/wkdkavishka/recipe-finder',
            image: '/images/projects/project-3.jpg',
        },
        {
            id: 'project-4',
            title: 'Portfolio Website',
            description:
                'A modern, responsive portfolio website built with Next.js and Tailwind CSS. Features dark mode, smooth animations, and a clean, minimalist design.',
            tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
            link: 'https://wkdkavishka.vercel.app',
            github: 'https://github.com/wkdkavishka/portfolio',
            image: '/images/projects/project-4.jpg',
        },
        {
            id: 'project-5',
            title: 'Weather Dashboard',
            description:
                'A weather application that provides current weather conditions and forecasts. Features location detection, 5-day forecast, and weather alerts. Built with React and the OpenWeather API.',
            tags: ['React', 'OpenWeather API', 'Geolocation', 'Chart.js'],
            link: 'https://weather-dashboard.wkdkavishka.vercel.app',
            github: 'https://github.com/wkdkavishka/weather-dashboard',
            image: '/images/projects/project-5.jpg',
        },
        {
            id: 'project-6',
            title: 'Fitness Tracker',
            description:
                'A mobile-first fitness tracking application that helps users log workouts, track progress, and set fitness goals. Includes exercise library and progress visualization.',
            tags: ['React Native', 'Firebase', 'Redux', 'Expo'],
            link: 'https://fitness-tracker.wkdkavishka.vercel.app',
            github: 'https://github.com/wkdkavishka/fitness-tracker',
            image: '/images/projects/project-6.jpg',
        },
        {
            id: 'project-7',
            title: 'E-Commerce Platform',
            description:
                'A full-stack e-commerce platform with user authentication, product catalog, shopping cart, and payment integration. Built with Next.js, TypeScript, and MongoDB.',
            tags: ['Next.js', 'TypeScript', 'MongoDB', 'Stripe', 'Tailwind CSS'],
            link: 'https://ecommerce-demo.wkdkavishka.vercel.app',
            github: 'https://github.com/wkdkavishka/ecommerce-platform',
            image: '/images/projects/project-7.jpg',
        },
    ],
    teamMembers: [
        {
            id: 'member-1',
            name: 'Alex Johnson',
            role: 'Senior Developer',
            company: 'TechCorp',
            image: '/images/team/member-1.jpg',
            testimonial:
                'Working with WKD was a fantastic experience. Their attention to detail and problem-solving skills are exceptional.',
            social: {
                linkedin: '#',
                twitter: '#',
                github: '#',
            },
        },
        {
            id: 'member-2',
            name: 'Sarah Williams',
            role: 'Product Manager',
            company: 'InnovateX',
            image: '/images/team/member-2.jpg',
            testimonial:
                "One of the most dedicated developers I've worked with. Delivered beyond expectations on every project.",
            social: {
                linkedin: '#',
                twitter: '#',
                github: '#',
            },
        },
        {
            id: 'member-3',
            name: 'Michael Chen',
            role: 'CTO',
            company: 'StartUpHub',
            image: '/images/team/member-3.jpg',
            testimonial:
                'Technical expertise and professionalism at its best. Highly recommended for any complex web development work.',
            social: {
                linkedin: '#',
                twitter: '#',
                github: '#',
            },
        },
        {
            id: 'member-4',
            name: 'Emily Rodriguez',
            role: 'UI/UX Designer',
            company: 'DesignMasters',
            image: '/images/team/member-4.jpg',
            testimonial:
                'Collaborating with WKD was seamless. They understand design principles and implement them perfectly.',
            social: {
                linkedin: '#',
                twitter: '#',
                github: '#',
            },
        },
    ],
    socialLinks: [
        {
            name: 'GitHub',
            url: 'https://github.com/wkdkavishka',
            icon: FaGithub,
        },
        {
            name: 'LinkedIn',
            url: 'https://linkedin.com/in/wkdkavishka',
            icon: FaLinkedin,
        },
        {
            name: 'Facebook',
            url: 'https://facebook.com/W.K.D.Kavishka',
            icon: FaFacebook,
        },
    ],
};

export default siteData;
