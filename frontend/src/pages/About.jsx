import React from 'react'
import { assets } from '../assets/assets'

const FeatureCard = ({ title, description }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-white p-8 transition-all duration-300 hover:shadow-xl">
    <div className="absolute inset-0 bg-gradient-to-r from-primary-600/5 to-primary-600/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    <div className="relative z-10">
      <h3 className="mb-4 text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
    <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary-600 to-primary-400 transition-all duration-300 group-hover:w-full" />
  </div>
);

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              About <span className="text-primary-600">Us</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Providing quality healthcare services with a focus on patient comfort and satisfaction
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="aspect-w-16 aspect-h-12 overflow-hidden rounded-2xl shadow-2xl">
              <img
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                src={assets.about_image}
                alt="Healthcare professionals"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-2xl bg-primary-100" />
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Mission
              </h2>
              <div className="mt-6 space-y-6 text-gray-600">
                <p className="leading-relaxed">
                  We are committed to providing accessible, high-quality healthcare services through our innovative digital platform. Our mission is to bridge the gap between patients and healthcare providers, making medical consultations more convenient and efficient.
                </p>
                <p className="leading-relaxed">
                  By leveraging technology, we aim to transform the traditional healthcare experience, making it more patient-centric and accessible to everyone, anywhere, anytime.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              <p className="mt-4 leading-relaxed text-gray-600">
                To revolutionize healthcare delivery by creating a seamless, digital-first experience that puts patients first while maintaining the highest standards of medical care and professional ethics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why <span className="text-primary-600">Choose</span> Us
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Experience healthcare reimagined through our innovative platform
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Efficiency"
              description="Our streamlined appointment system and digital consultations save you time and effort, ensuring you get the care you need without unnecessary delays."
            />
            <FeatureCard
              title="Convenience"
              description="Access healthcare services from the comfort of your home, with flexible scheduling options and easy-to-use digital tools."
            />
            <FeatureCard
              title="Personalization"
              description="Receive tailored healthcare solutions that match your specific needs, with personalized recommendations and follow-up care."
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary-600">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            <div>
              <div className="text-4xl font-bold text-white">5000+</div>
              <div className="mt-2 text-sm text-primary-100">Happy Patients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white">100+</div>
              <div className="mt-2 text-sm text-primary-100">Expert Doctors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white">24/7</div>
              <div className="mt-2 text-sm text-primary-100">Online Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white">98%</div>
              <div className="mt-2 text-sm text-primary-100">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-primary-400 shadow-xl">
            <div className="px-8 py-12 text-center sm:px-12">
              <h3 className="text-3xl font-bold text-white">Ready to Get Started?</h3>
              <p className="mx-auto mt-4 max-w-2xl text-primary-100">
                Join thousands of satisfied patients who have chosen our platform for their healthcare needs.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <button className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600">
                  Book Appointment
                </button>
                <button className="rounded-lg border border-white bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
