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
    FaWhatsapp,
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
    image: string[];
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
            id: 'irs-calculator',
            title: 'ADHD Self-Assessment Tool (Sort Of) test',
            description:
                'An interactive Internal Restlessness Scale (IRS) assessment tool that helps evaluate ADHD-related inner restlessness. Features a responsive questionnaire with instant results and detailed insights.',
            tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Mental Health'],
            link: 'https://wkdkavishka.github.io/irs',
            github: 'https://github.com/wkdkavishka/IRS-Calculate_Inner_restlessnes_score',
            image: [
                '/images/projects/irs-calculator/1.png',
                '/images/projects/irs-calculator/2.png',
                '/images/projects/irs-calculator/3.png',
                '/images/projects/irs-calculator/4.png',
            ],
        },
        {
            id: 'wkdkavishka-vue',
            title: 'My old Portfolio Template',
            description:
                'A full-stack e-commerce platform with user authentication, product catalog, shopping cart, and payment integration. Built with Next.js, TypeScript, and MongoDB.',
            tags: ['Next.js', 'TypeScript', 'MongoDB', 'Stripe', 'Tailwind CSS'],
            link: 'https://ecommerce-demo.wkdkavishka.vercel.app',
            github: 'https://github.com/wkdkavishka/ecommerce-platform',
            image: [
                '/images/projects/wkdkavishka-vue/1.png',
                '/images/projects/wkdkavishka-vue/2.png',
                '/images/projects/wkdkavishka-vue/3.png',
                '/images/projects/wkdkavishka-vue/4.png',
            ],
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
        {
            name: 'WhatsApp',
            url: 'https://wa.me/94757676968',
            icon: FaWhatsapp,
        },
    ],
};

export default siteData;
