import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl mx-4 sm:mx-6 lg:mx-8 my-8">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px]" />
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-primary-500/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-primary-500/30 rounded-full blur-3xl" />

            <div className="relative max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center px-6 py-12 sm:px-8 sm:py-16 lg:py-24">
                    {/* Left side - Content */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                            Book Appointment
                            <br />
                            <span className="text-primary-100">
                                With Trusted Doctors
                            </span>
                        </h1>

                        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start mb-8">
                            <div className="relative">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((index) => (
                                        <img
                                            key={index}
                                            className="w-12 h-12 rounded-full border-2 border-white object-cover relative hover:z-10 transition-transform hover:scale-110"
                                            src={assets.group_profiles}
                                            alt={`Doctor ${index}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="text-primary-100 text-lg max-w-sm">
                                Join thousands of patients who trust our network of certified medical professionals
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a
                                href="#speciality"
                                className="inline-flex items-center px-8 py-3 border-2 border-white bg-white text-primary-600 rounded-full text-lg font-medium shadow-sm hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-primary-600 transform hover:scale-105 transition-all duration-200"
                            >
                                Book Appointment
                                <svg
                                    className="ml-2 -mr-1 w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            </a>
                            
                            <a
                                href="#doctors"
                                className="inline-flex items-center px-8 py-3 border-2 border-white/80 text-white rounded-full text-lg font-medium hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-primary-600 transform hover:scale-105 transition-all duration-200"
                            >
                                Browse Doctors
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="mt-12 grid grid-cols-3 gap-8">
                            <div>
                                <p className="text-3xl font-bold text-white">100+</p>
                                <p className="text-primary-100">Doctors</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white">10k+</p>
                                <p className="text-primary-100">Patients</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white">4.9</p>
                                <p className="text-primary-100">Rating</p>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Image */}
                    <div className="relative lg:h-full">
                        <div className="relative z-10 transform hover:scale-105 transition-transform duration-500 ease-in-out">
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-600/50 to-transparent rounded-2xl" />
                            <img
                                className="w-full h-auto rounded-2xl shadow-2xl"
                                src={assets.header_img}
                                alt="Doctor with patient"
                            />
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-400/30 rounded-full blur-2xl" />
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-400/30 rounded-full blur-2xl" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
