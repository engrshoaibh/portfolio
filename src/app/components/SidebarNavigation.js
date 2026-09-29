'use client';

import React from 'react';
import BranchedMenu from '@/components/BranchedMenu/BranchedMenu';
import { FiUser, FiCode, FiLayers, FiBriefcase, FiMail } from 'react-icons/fi';

const NAV_ITEMS = [
  {
    label: 'Sections',
    children: [
      { value: '#about', label: 'About Me', icon: <FiUser size={16} /> },
      { value: '#projects', label: 'Projects', icon: <FiCode size={16} /> },
      { value: '#tech', label: 'Tech Stack', icon: <FiLayers size={16} /> },
      { value: '#services', label: 'Services', icon: <FiBriefcase size={16} /> },
      { value: '#contact', label: 'Contact', icon: <FiMail size={16} /> }
    ]
  }
];

export default function SidebarNavigation() {
  const handleNavSelect = (value) => {
    const el = document.querySelector(value);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl">
      <BranchedMenu
        items={NAV_ITEMS}
        defaultOpen={[0]}
        defaultActive="#about"
        onSelect={handleNavSelect}
        color="#a1a1aa"
        accentColor="#fb923c" /* Tailwind orange-400 */
        lineColor="#3f3f46"
        width={220}
      />
    </div>
  );
}
