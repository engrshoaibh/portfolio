import { FaFacebook, FaTwitter ,FaGithub ,FaInstagram} from "react-icons/fa";
const bulletPoints = [
    'Freshly graduated student with a BS in Software Engineering.',
    'Developed my final year project titled "Brain Tumor and Alzheimer\'s Detection," which is research-oriented.',
    'Enthusiastic learner and researcher in the field of machine learning.',
    'I achieved a CGPA of 3.69/4.00.',
    'I want to continue my research in the field of computer science.'
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
        icon: <FaInstagram/>,
        url: 'https://instagram.com/'
    },
]

export default {bulletPoints, socialIcons};

