'use client'
import WavyWrapper from './WavyWrapper';

import { useEffect, useState, useRef, useMemo } from 'react';
import profilePic from '../../../assets/image-nobg.png';
import data from './data';
// Removed BlobMorph background per request
import gsap from 'gsap';
import Image from 'next/image';

const { bulletPoints, socialIcons } = data;

const About = () => {
    const imageRef = useRef(null);
    const nameRef = useRef(null);
    const imageContainerRef = useRef(null);
    const subtitleRef = useRef(null);
    const bulletPointsRef = useRef(null);
    const socialIconsRef = useRef(null);
    const buttonRef = useRef(null);

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
        if (!nameRef.current || !imageContainerRef.current) return;

        // Use CSS animations for entrance to prevent Speed Index delay.
        // 4. Start floating animation for the picture
        gsap.to(imageRef.current, {
            y: 10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: 0.5,
        });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div className='mx-auto max-w-5xl px-6 md:px-8 py-12 md:py-16 flex flex-col items-center justify-center min-h-[85vh] text-center'>
            {/* Centered Stack of Name and Image */}
            <div className='relative w-full flex items-center justify-center min-h-[240px] md:min-h-[340px] mb-8 select-none'>
                {/* Name Section (Largest Font using Playfair Display, Background Layer) */}
                <div className='overflow-hidden w-full py-4 z-0'>
                    <div ref={nameRef} className='animate-hero-name will-change-transform'>
                        <h1 className='text-white text-[8.5vw] lg:text-[7.5rem] font-black font-poppins tracking-tight leading-none text-center whitespace-nowrap'>
                            SHOAIB HASSAN
                        </h1>
                    </div>
                </div>

                {/* Image Section (Overlay Layer, Centered Vertically and Horizontally) */}
                <div 
                    ref={imageContainerRef} 
                    className='absolute z-10 pointer-events-none group flex justify-center items-center will-change-transform'
                >
                    <div className='pointer-events-auto flex justify-center items-center w-[240px] h-[240px] md:w-[340px] md:h-[340px] rounded-full overflow-hidden border border-white/10 bg-white/5 backdrop-blur card-hover transition-all duration-500 ease-out shadow-[0_0_50px_rgba(249,115,22,0.15)] hover:shadow-[0_0_50px_rgba(249,115,22,0.3)]'>
                        <Image
                            ref={imageRef}
                            src={profilePic}
                            alt="Profile"
                            width={340}
                            height={340}
                            placeholder="blur"
                            className="w-full h-full object-cover rounded-full shadow-lg"
                            sizes="(max-width: 768px) 240px, 340px"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Subtitle / Typing text */}
            <div ref={subtitleRef} className='animate-hero-fade mt-6' style={{ animationDelay: '0.5s' }}>
                <WavyWrapper intensity={3} speed={12}>
                    <p className='text-white text-xl sm:text-2xl md:text-3xl font-medium tracking-wide'>
                        I&apos;m a <span className='text-orange-400 font-bold'>{text}</span>
                        <span className={`text-orange-400 font-bold ${showCursor ? 'inline' : 'hidden'}`}>|</span>
                    </p>
                </WavyWrapper>
            </div>

            {/* Bullet Points */}
            <div ref={bulletPointsRef} className='animate-hero-fade mt-8 max-w-2xl mx-auto' style={{ animationDelay: '0.6s' }}>
                <ul className='inline-flex flex-col items-start gap-3 text-left text-white/80'>
                    {bulletPoints.map((point, index) => (
                        <li key={index} className='text-sm md:text-[15px] flex items-start gap-3 hover:text-white transition-colors duration-200'>
                            <span className='text-orange-400 mt-1 select-none'>✦</span>
                            <span>{point}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Social Icons */}
            <div ref={socialIconsRef} className='animate-hero-fade mt-8' style={{ animationDelay: '0.7s' }}>
                <ul className='flex gap-4 justify-center'>
                    {socialIcons.map((icon, index) => (
                        <li key={index} className='text-white text-[24px] cursor-pointer'>
                            <div className='flex items-center justify-center w-12 h-12 rounded-full border-2 border-orange-500/50 bg-gray-800/40 backdrop-blur transition duration-300 ease-in-out hover:shadow-lg hover:shadow-orange-500/50 hover:bg-gray-700/60 hover:scale-110'>
                                <a href={icon.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                                    {icon.icon}
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* CV Download Button */}
            <div ref={buttonRef} className='animate-hero-fade mt-8' style={{ animationDelay: '0.8s' }}>
                <button  className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 transition-all duration-300 ease-in-out hover:scale-105"
                onClick={() => {
                    window.location.href = 'https://drive.google.com/uc?export=download&id=1Y9VdGCSZeILbqWDyZfAQLfk5ndOXEmC-';
                }}
                >
                    Download CV
                </button>
            </div>
        </div>
    );
};

export default About;
