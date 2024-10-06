'use client'
import {Disclosure, DisclosurePanel, DisclosureButton } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from '../../../assets/logo.png'
const navigation = [
    { name: 'About Me', href: '#', current: true },
    { name: 'Projects', href: '#', current: false },
    { name: 'Services', href: '#', current: false },
    { name: 'Contact Me', href: '#', current: false },
]


export default function Header() {
    return (
        <Disclosure as="nav" >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton className="group inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="block h-6 w-6 group-data-[open]:hidden" aria-hidden="true" />
                            <XMarkIcon className="hidden h-6 w-6 group-data-[open]:block" aria-hidden="true" />
                        </DisclosureButton>
                    </div>
                    
                    {/* Logo */}
                    <div className="flex flex-shrink-0 items-center hidden sm:block">
                        <img
                            className="h-8 w-auto"
                            src={logo.src}
                            alt="Shoaib Hassan"
                        />
                    </div>

                    {/* Desktop navigation */}
                    <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={`text-white hover:text-orange-400 rounded-md px-3 py-2 text-sm font-medium`}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 transition-all duration-300 ease-in-out"
                        
                        onClick={
                            location.href = 'https://drive.google.com/uc?export=download&id=1Y9VdGCSZeILbqWDyZfAQLfk5ndOXEmC-'
                        }>
                            Download CV
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <DisclosurePanel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            className={`block text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${
                                item.current ? 'bg-gray-900' : ''
                            }`}
                            aria-current={item.current ? 'page' : undefined}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}