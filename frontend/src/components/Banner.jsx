import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Banner = () => {
    const navigate = useNavigate()

    const features = [
        { icon: "🏥", title: "Expert Doctors", description: "Access to certified healthcare professionals" },
        { icon: "⏰", title: "24/7 Support", description: "Round-the-clock medical assistance" },
        { icon: "📅", title: "Easy Booking", description: "Schedule appointments in minutes" }
    ]

    return (
        <div className='relative overflow-hidden rounded-2xl my-8 md:my-20'>
            {/* Background with website theme gradient */}
            <div className='absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 opacity-95'></div>
            
            {/* Animated background shapes */}
            <motion.div 
                animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1],
                }} 
                transition={{ 
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-0 right-0 w-96 h-96 bg-sky-500/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"
            />
            
            {/* Content Container */}
            <div className='relative z-10 px-6 sm:px-10 lg:px-16 py-16 md:py-20'>
                {/* Main Content */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='text-center max-w-4xl mx-auto'
                >
                    <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white'>
                        Your Health, Our Priority
                    </h1>
                    <p className='mt-6 text-lg sm:text-xl text-sky-50 max-w-2xl mx-auto'>
                        Experience healthcare reimagined. Book appointments with top doctors, 
                        get instant consultations, and manage your health journey seamlessly.
                    </p>
                    
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            navigate('/login')
                            scrollTo(0,0)
                        }}
                        className='mt-8 px-8 py-4 bg-accent-500 text-secondary-900 rounded-full font-semibold 
                                 shadow-lg hover:shadow-xl transition-all duration-300
                                 flex items-center gap-2 text-lg mx-auto hover:bg-accent-400'
                    >
                        Get Started Now
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </motion.button>

                    {/* Features Grid */}
                    <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className='bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 
                                         transition-all duration-300 cursor-pointer border border-sky-200/20
                                         hover:border-sky-200/30 group'
                            >
                                <div className='text-4xl mb-4 group-hover:scale-110 transition-transform duration-300'>{feature.icon}</div>
                                <h3 className='text-xl font-semibold text-accent-500 mb-2'>{feature.title}</h3>
                                <p className='text-sky-50/90'>{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Bottom decorative element */}
            <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-500/30 to-transparent'></div>
        </div>
    )
}

export default Banner
