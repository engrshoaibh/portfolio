import { FaFacebook, FaTwitter ,FaGithub ,FaInstagram, FaLinkedinIn} from "react-icons/fa";
const bulletPoints = [
    '1.5+ Years of Experience in mobile development (Flutter and FlutterFlow).',
    'Experience in Next.js web development.'
];

const socialIcons = [
    {
        name: "Facebook",
        icon: <FaFacebook/>,
        url: 'https://facebook.com/'
    },
    {
        name: "Twitter",
        icon: <FaTwitter/>,
        url: 'https://x.com/'
    },
    {
        name: "Github",
        icon: <FaGithub />,
        url: 'https://github.com/engrshoaibh'
    },
    {
        name: "Instagram",
        icon: <FaLinkedinIn/>,
        url: 'https://linkedin.com/in/engrshoaibhassan'
    },

]

const exported = { bulletPoints, socialIcons }
export default exported;

