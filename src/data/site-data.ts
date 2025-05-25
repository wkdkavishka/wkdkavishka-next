import { IconType } from "react-icons";
import {
  FaReact,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaCode,
  FaMobileAlt,
  FaCloud,
  FaPalette
} from "react-icons/fa";

export interface Skill {
  name: string;
  description: string;
  icon: IconType;
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
  services: Skill[];
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
    name: "Kavishka Weerasinghe",
    title: "Software Engineer",
    location: "Colombo, Sri Lanka",
    email: "wkd.kavishka@gmail.com",
    profileImage: "/images/profile.jpg",
    about: [
      "I'm a passionate software engineer with experience in building modern web applications.",
      "I specialize in JavaScript/TypeScript, React, and Node.js, with a strong foundation in computer science principles and software architecture.",
      "When I'm not coding, you can find me exploring new technologies, contributing to open source, and sharing knowledge with the developer community.",
    ],
    resumeUrl: "/resume.pdf",
  },
  services: [
    {
      name: "Web Applications",
      description: "Custom web applications built with modern technologies like React, Next.js, and TypeScript",
      icon: FaReact
    },
    {
      name: "Custom Software Solutions",
      description: "Tailored software solutions designed to meet your specific business needs",
      icon: FaCode
    },
    {
      name: "Mobile Apps (Android & iOS)",
      description: "Cross-platform mobile applications for both Android and iOS platforms",
      icon: FaMobileAlt
    },
    {
      name: "Cloud Services",
      description: "Cloud infrastructure setup, deployment, and management",
      icon: FaCloud
    },
    {
      name: "UI/UX Design",
      description: "Beautiful and intuitive user interfaces with exceptional user experience",
      icon: FaPalette
    }
  ],
  projects: [
    {
      id: "project-1",
      title: "Project One",
      description: "A brief description of project one and what it does.",
      tags: ["React", "Node.js", "MongoDB"],
      link: "https://github.com/yourusername/project-one",
      github: "https://github.com/yourusername/project-one",
      image: "/images/project-1.jpg",
    },
    {
      id: "project-2",
      title: "Project Two",
      description: "A brief description of project two and what it does.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      link: "https://your-project-two.vercel.app",
      github: "https://github.com/yourusername/project-two",
      image: "/images/project-2.jpg",
    },
  ],
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/yourusername",
      icon: FaGithub,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
      icon: FaLinkedin,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/yourusername",
      icon: FaTwitter,
    },
  ],
};

export default siteData;
