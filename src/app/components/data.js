import { FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

const bulletPoints = [
  'Full-Stack Web Development with Next.js, React & modern cloud backends.',
  'AI-powered Automations, Agent workflows & business systems.',
  'High-impact UGC video ads, property listing visuals & motion editing.'
];

const socialIcons = [
  {
    name: "GitHub",
    icon: <FaGithub />,
    url: 'https://github.com/engrshoaibh'
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedinIn />,
    url: 'https://linkedin.com/in/engrshoaibhassan'
  },
  {
    name: "X (Twitter)",
    icon: <FaTwitter />,
    url: 'https://x.com/'
  },
  {
    name: "Email",
    icon: <FiMail />,
    url: 'mailto:shoaibhassan@example.com'
  }
];

const exported = { bulletPoints, socialIcons };
export default exported;
