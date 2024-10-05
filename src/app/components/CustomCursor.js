'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;

        const handleMouseMove = (event) => {
            gsap.to(cursor, {
                duration: 0.2,
                x: event.clientX ,
                y: event.clientY ,
                ease: "power2.out", 
            });
        };
        const handleMouseLeave = (event) => {
            gsap.to(cursor, {
               backgroundColor: transparent, 
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseleave', handleMouseLeave)
        };
    }, []);
    

    return (
        <div
            ref={cursorRef}
            className="custom-cursor"
            style={{
                position: 'fixed',
                width: '30px',
                height: '30px',
                backgroundColor: 'rgba(255, 165, 0, 0.8)',
                borderRadius: '50%',
                pointerEvents: 'none', 
                transform: 'translate(-50%, -50%)',
            }}
        ></div>
    );
};

export default CustomCursor;
