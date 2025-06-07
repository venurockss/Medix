import React from 'react'
import { assets } from '../assets/assets'

const ContactCard = ({ icon, title, content, link, linkText }) => (
  <div className="bg-white p-6 rounded-2xl shadow-card hover:shadow-soft transition-all duration-300 transform hover:-translate-y-1">
    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    {content.map((line, index) => (
      <p key={index} className="text-gray-600 mb-1">{line}</p>
    ))}
    {link && (
      <a
        href={link}
        className="inline-flex items-center mt-3 text-primary-600 hover:text-primary-700 font-medium"
      >
        {linkText}
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    )}
  </div>
);

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-600 to-primary-700 py-20">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Get in Touch
          </h1>
          <p className="mt-6 text-xl text-primary-100 max-w-3xl mx-auto">
            We're here to help and answer any questions you might have
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Office Location */}
          <ContactCard
            icon={
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            title="Visit Our Office"
            content={[
              "03749 Sangareddy",
              "Srinagar Colony",
              "Open Monday - Friday",
              "9:00 AM - 6:00 PM"
            ]}
          />

          {/* Contact Information */}
          <ContactCard
            icon={
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
            title="Contact Info"
            content={[
              "+1 (646) 312-5441",
              "example@gmail.com",
              "24/7 Customer Support"
            ]}
            link="mailto:example@gmail.com"
            linkText="Send us an email"
          />

          {/* Careers */}
          <ContactCard
            icon={
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
            title="Join Our Team"
            content={[
              "We're always looking for talented individuals to join our team.",
              "Explore exciting career opportunities with us."
            ]}
            link="/careers"
            linkText="View open positions"
          />
        </div>

        {/* Contact Image Section */}
        <div className="mt-16 mb-24">
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Let's Build the Future of Healthcare Together
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Whether you're a patient, healthcare provider, or potential partner, we'd love to hear from you. Reach out to us and let's discuss how we can work together.
                </p>
                <div className="space-y-4">
                  <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200">
                    Schedule a Meeting
                    <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200">
                    View Support Resources
                    <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="relative h-64 lg:h-auto">
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src={assets.contact_image}
                  alt="Contact us illustration"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
