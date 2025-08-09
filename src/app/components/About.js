'use client'
import WavyWrapper from './WavyWrapper';

import { useEffect, useState, useRef, useMemo } from 'react';
import profilePic from '../../../assets/image.png';
import data from './data';
// Removed BlobMorph background per request
import ParticleImage from './ParticleImage';
import gsap from 'gsap';
import Image from 'next/image';

const { bulletPoints, socialIcons } = data;

const About = () => {
    const imageRef = useRef(null);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
    const [showCursor, setShowCursor] = useState(true);

    // Stable words list
    const words = useMemo(() => ["Software Engineer", "ReactJS Developer", "Research Enthusiast"], []);

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
        <div className='mx-auto max-w-7xl px-6 md:px-8 py-16 flex flex-col md:flex-row justify-between items-center gap-10'>
            {/* Text Section */}
            <div className='flex flex-col flex-1 w-full max-w-2xl'>
                <WavyWrapper intensity={6} speed={12}>
                    <p className='text-white mt-4'>
                        <span className='font-bold text-[40px]'>Shoaib Hassan</span>
                    </p>
                </WavyWrapper>
                <WavyWrapper intensity={5} speed={14}>
                    <p className='text-white text-[35px]'>
                        I&apos;m a <span className='text-orange-400 font-bold'>{text}</span>
                        <span className={`text-orange-400 font-bold ${showCursor ? 'inline' : 'hidden'}`}>|</span>
                    </p>
                </WavyWrapper>

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
                    <button  className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 transition-all duration-300 ease-in-out"
                    onClick={() => {
                        window.location.href = 'https://drive.google.com/uc?export=download&id=1Y9VdGCSZeILbqWDyZfAQLfk5ndOXEmC-';
                    }}
                    >
                        Download CV
                    </button>
                </div>
            </div>

            {/* Image Section */}
            <div className='relative group flex justify-center md:justify-end items-center flex-1 w-full'>
                <div className='flex justify-center items-center w-[300px] h-[300px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden border border-white/10 bg-white/5 backdrop-blur card-hover grayscale group-hover:grayscale-0 transition-[filter] duration-500 ease-out'>
                    <ParticleImage src={profilePic.src} width={420} height={420} className='hidden md:block w-full h-full' />
                    <Image
                        ref={imageRef}
                        src={profilePic}
                        alt="Profile"
                        width={profilePic.width}
                        height={profilePic.height}
                        placeholder="blur"
                        className="md:hidden w-full h-full object-cover rounded-full shadow-lg"
                        sizes="(max-width: 768px) 300px, 420px"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}

export default About;
