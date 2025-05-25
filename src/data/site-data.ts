import { IconType } from 'react-icons';
import { FaReact, FaNodeJs, FaPython, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiNextdotjs, SiTailwindcss, SiDocker, SiPostgresql, SiMongodb, SiGraphql } from 'react-icons/si';

// Define the type for skill category
type SkillCategory = 'frontend' | 'backend' | 'devops' | 'other';

export interface Skill {
  name: string;
  icon: IconType;
  category: SkillCategory;
}

export interface Project {
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

export interface SiteData {
  personal: {
    name: string;
    title: string;
    location: string;
    email: string;
    profileImage: string;
    about: string[];
    resumeUrl: string;
  };
  skills: Skill[];
  projects: Project[];
  socialLinks: Array<{
    name: string;
    url: string;
    icon: IconType;
  }>;
}

// Create the site data with proper typing
const siteData: SiteData = {
  personal: {
    name: 'Kavishka Weerasinghe',
    title: 'Software Engineer',
    location: 'Colombo, Sri Lanka',
    email: 'wkd.kavishka@gmail.com',
    profileImage: '/profile-placeholder.jpg',
    about: [
      "I'm a passionate software engineer with experience in building modern web applications.",
      "I specialize in JavaScript/TypeScript, React, and Node.js, with a strong foundation in computer science principles and software architecture.",
      "When I'm not coding, you can find me exploring new technologies, contributing to open source, and sharing knowledge with the developer community."
    ],
    resumeUrl: '/resume.pdf'
  },
  skills: [
    { name: 'React', icon: FaReact, category: 'frontend' as const },
    { name: 'TypeScript', icon: SiTypescript, category: 'frontend' as const },
    { name: 'JavaScript', icon: SiJavascript, category: 'frontend' as const },
    { name: 'Next.js', icon: SiNextdotjs, category: 'frontend' as const },
    { name: 'Tailwind CSS', icon: SiTailwindcss, category: 'frontend' as const },
    { name: 'Node.js', icon: FaNodeJs, category: 'backend' as const },
    { name: 'Python', icon: FaPython, category: 'backend' as const },
    { name: 'GraphQL', icon: SiGraphql, category: 'backend' as const },
    { name: 'Docker', icon: SiDocker, category: 'devops' as const },
    { name: 'PostgreSQL', icon: SiPostgresql, category: 'backend' as const },
    { name: 'MongoDB', icon: SiMongodb, category: 'backend' as const },
  ],
  projects: [
    {
      id: 'project-1',
      title: 'Project One',
      description: 'A brief description of project one and what it does.',
      tags: ['React', 'Node.js', 'MongoDB'],
      link: 'https://github.com/yourusername/project-one',
      github: 'https://github.com/yourusername/project-one',
      image: '/images/project-1.jpg'
    },
    {
      id: 'project-2',
      title: 'Project Two',
      description: 'A brief description of project two and what it does.',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      link: 'https://your-project-two.vercel.app',
      github: 'https://github.com/yourusername/project-two',
      image: '/images/project-2.jpg'
    },
  ],
  socialLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com/yourusername',
      icon: FaGithub
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',
      icon: FaLinkedin
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/yourusername',
      icon: FaTwitter
    }
  ]
};

export default siteData;
