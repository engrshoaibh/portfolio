'use client'
import {Disclosure, DisclosurePanel, DisclosureButton } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import logo from '../../../assets/logo.png'
import { useTheme } from 'next-themes'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useEffect, useState } from 'react'

const navigation = [
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Tech', href: '#tech' },
    { name: 'Contact', href: '#contact' },
]

export default function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 20);
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <Disclosure as="nav" className={`fixed w-full z-50 transition-all duration-300 ease-[cubic-bezier(0.4,0.3,0,1)] ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
            isScrolled ? 'top-4' : 'top-0'
        }`}> 
            <div className={`mx-auto transition-all duration-300 ${isScrolled ? 'max-w-5xl px-4 sm:px-6' : 'max-w-7xl px-4 sm:px-6 lg:px-8'}`}>
                <div className={`relative flex h-16 items-center justify-between transition-all duration-300 ${
                    isScrolled 
                        ? 'rounded-full backdrop-blur-xl bg-white/70 dark:bg-[#0a0a0a]/70 border border-gray-200/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] px-6' 
                        : 'bg-transparent border-transparent px-0'
                }`}>
                    <div className="flex items-center sm:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton className="group inline-flex items-center justify-center rounded-lg p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white focus:outline-none">
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="block h-6 w-6 group-data-[open]:hidden" aria-hidden="true" />
                            <XMarkIcon className="hidden h-6 w-6 group-data-[open]:block" aria-hidden="true" />
                        </DisclosureButton>
                    </div>
                    
                    {/* Logo */}
                    <div className="flex flex-shrink-0 items-center">
                        <a href="#about" className="flex items-center gap-2">
                            <Image
                                className="h-8 w-auto"
                                src={logo}
                                alt="Shoaib Hassan"
                                height={32}
                                priority
                            />
                        </a>
                    </div>

                    {/* Desktop navigation */}
                    <div className="hidden sm:block">
                        <div className="flex space-x-1 sm:space-x-2">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-black/5 dark:hover:bg-white/5 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-colors"
                                    aria-label={item.name}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Actions: Theme Toggle & Contact Button */}
                    <div className="flex items-center gap-3">
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
                            </button>
                        )}
                        <a
                            href="#contact"
                            className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
                        >
                            Hire Me
                        </a>
                    </div>
                </div>
            </div>

            {/* Mobile menu dropdown */}
            <DisclosurePanel className="sm:hidden px-4 pt-2 pb-4 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 shadow-xl">
                <div className="space-y-1">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-800 dark:text-gray-200 hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                    <DisclosureButton
                        as="a"
                        href="#contact"
                        className="block mt-2 text-center rounded-lg px-3 py-2 text-base font-bold bg-orange-500 text-white"
                    >
                        Hire Me
                    </DisclosureButton>
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}
