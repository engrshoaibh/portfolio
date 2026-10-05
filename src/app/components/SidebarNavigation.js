'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import BranchedMenu from '@/components/BranchedMenu/BranchedMenu';
import { FiUser, FiCode, FiLayers, FiBriefcase, FiMail, FiMenu } from 'react-icons/fi';

const NAV_ITEMS = [
  {
    label: 'Sections',
    children: [
      { value: '#about', label: 'About Me', icon: <FiUser size={16} /> },
      { value: '#projects', label: 'Projects', icon: <FiCode size={16} /> },
      { value: '#tech', label: 'Tech Stack', icon: <FiLayers size={16} /> },
      { value: '#contact', label: 'Contact', icon: <FiMail size={16} /> }
    ]
  }
];

export default function SidebarNavigation() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = mounted && resolvedTheme === 'light';

  const handleNavSelect = (value) => {
    const el = document.querySelector(value);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hidden lg:flex fixed left-0 top-1/2 -translate-y-1/2 z-50 group py-12 pr-12 -ml-2">
      {/* Circle Icon (Half hidden on the left) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 dark:bg-black/80 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-full flex items-center justify-end pr-1 shadow-[0_0_20px_rgba(249,115,22,0.2)] text-orange-500 dark:text-orange-400 -translate-x-1/2 transition-all duration-500 ease-out group-hover:-translate-x-[150%] group-hover:opacity-0 cursor-pointer">
        <FiMenu size={24} className="opacity-80" />
      </div>

      {/* Menu Panel */}
      <div className="bg-white/90 dark:bg-black/80 backdrop-blur-xl p-5 rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl transition-all duration-500 ease-out opacity-0 -translate-x-12 scale-95 group-hover:opacity-100 group-hover:translate-x-4 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto origin-left">
        <BranchedMenu
          items={NAV_ITEMS}
          defaultOpen={[0]}
          defaultActive="#about"
          onSelect={handleNavSelect}
          color={isLight ? "#4b5563" : "#a1a1aa"}
          accentColor="#fb923c"
          lineColor={isLight ? "#e5e7eb" : "#3f3f46"}
          width={220}
        />
      </div>
    </div>
  );
}
