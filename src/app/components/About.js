'use client'

import { useEffect, useState, useRef } from 'react';
import profilePic from '../../../assets/image.png';
import data from './data';
import gsap from 'gsap';

const { bulletPoints, socialIcons } = data;

const About = () => {
    const imageRef = useRef(null);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
    const [showCursor, setShowCursor] = useState(true);

    // Move words outside of the component to avoid re-creation on each render
    const words = ["Software Engineer", "ReactJS Developer", "Research Enthusiast"];

    useEffect(() => {
        const handleTyping = () => {
            const currentWord = words[loopNum % words.length];
            setText(
                isDeleting
                    ? currentWord.substring(0, text.length - 1)
                    : currentWord.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 50 : 150);

            if (!isDeleting && text === currentWord) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);

        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed, words]);

    useEffect(() => {
        const cursorBlink = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);
        return () => clearInterval(cursorBlink);
    }, []);

    useEffect(() => {
        const animateImage = () => {
            gsap.to(imageRef.current, {
                y: 10,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
            });
        };

        animateImage();
    }, []);

    return (
        <div className='flex flex-col md:flex-row bg-white-500 justify-center items-center gap-4 mt-20 mx-20'>
            {/* Text Section */}
            <div className='h-32 flex flex-col flex-1'>
                <p className='text-white mt-4'>
                    <span className='font-bold text-[40px]'>Shoaib Hassan</span>
                </p>
                <p className='text-white text-[35px]'>
                    I&apos;m a <span className='text-orange-400 font-bold'>{text}</span>
                    <span className={`text-orange-400 font-bold ${showCursor ? 'inline' : 'hidden'}`}>|</span>
                </p>

                <div className='mt-10'>
                    <ul className='list-disc list-inside text-white'>
                        {bulletPoints.map((point, index) => (
                            <li key={index} className='text-white text-[14px]'>
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='mt-8'>
                    <ul className='flex gap-4 '>
                        {socialIcons.map((icon, index) => (
                            <li key={index} className='text-white text-[24px] cursor-pointer'>
                                <div className='flex items-center justify-center w-12 h-12 rounded-full border-2 border-orange-500 bg-gray-800 transition duration-300 ease-in-out hover:shadow-lg hover:shadow-orange-500/50 hover:bg-gray-700'>
                                    <a href={icon.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                                        {icon.icon}
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8">
                    <button className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 transition-all duration-300 ease-in-out">
                        Download CV
                    </button>
                </div>
            </div>

            {/* Image Section */}
            <div className='relative flex justify-center h-32 '>
                <div className='flex justify-center items-center ' style={{ width: 400, height: 400 }}>
                    <img
                        ref={imageRef}
                        src={profilePic.src}
                        alt="Profile"
                        width={profilePic.width}
                        height={profilePic.height}
                        placeholder="blur"
                        className="mx-auto md:mx-0 rounded-full shadow-lg frozon"
                    />
                </div>
            </div>
        </div>
    );
}

export default About;
