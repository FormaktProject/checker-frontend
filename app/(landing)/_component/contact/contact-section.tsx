"use client"

import ContactForm from './contact-form';
import ContactInfo from "./contact-info"

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Map and Form Section */}
        <div className="relative mb-16">
          <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl bg-white">
            {/* Map */}
            <div className="relative h-96 lg:h-auto min-h-[500px] bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.0123456789!2d10.1815!3d36.8485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd337f5e7ef543%3A0x1234567890abcdef!2sMontplaisir%2C%20Tunis%2C%20Tunisia!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
                title="Montplaisir, Tunis Location"
              />
            </div>
            
            {/* Contact Form */}
            <div className="p-8 lg:p-12 bg-white">
              <div className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                  Send us a message
                </h2>
                <p className="text-gray-600 text-base leading-relaxed">
                  Get in touch with our team for accommodation verification services
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Contact Us
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              We&apos;re here to help you verify your accommodation and ensure a safe travel experience. 
              Reach out to us through any of the channels below.
            </p>
          </div>
          
          <ContactInfo />
          
          {/* Additional Info Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid md:grid-cols-2 gap-8 text-center md:text-left">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Business Hours</h4>
                <div className="text-gray-600 space-y-1">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Response Time</h4>
                <div className="text-gray-600 space-y-1">
                  <p>Email: Within 24 hours</p>
                  <p>Phone: Immediate during business hours</p>
                  <p>Emergency: 24/7 support available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
