"use client"
import Link from 'next/link';
import {  Globe, DollarSign, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
        { name: "Blog", href: "/blog" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Safety", href: "/safety" },
        { name: "Cancellation", href: "/cancellation" },
        { name: "Contact Us", href: "#contact" }
      ]
    },
    {
      title: "Community",
      links: [
        { name: "Diversity", href: "/diversity" },
        { name: "Accessibility", href: "/accessibility" },
        { name: "Partners", href: "/partners" },
        { name: "Invite Friends", href: "/invite" }
      ]
    }
  ];

  const socialLinks = [
    { icon: <FaFacebook/>, href: "#", name: "Facebook" },
    { icon:  <FaTwitter/>, href: "#", name: "Twitter" },
    { icon: <FaInstagram/>, href: "#", name: "Instagram" },
    { icon: <FaLinkedin/>, href: "#", name: "LinkedIn" }
  ];

  return (
    <footer className="bg-gray-900/95 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h5 className="text-lg font-semibold text-white mb-6">Contact Us</h5>
              <div className="space-y-4">
                
                <div>
                  
                  <a href="mailto:contact@checkerist.com" className="text-lg font-medium text-white">
                    contact@checkerist.com
                  </a>
                </div>
              </div>

              {/* Mobile Apps 
              <div className="mt-8">
                <h5 className="text-lg font-semibold text-white mb-4">Mobile</h5>
                <div className="space-y-3">
                  <a href="#" className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200">
                    <div className="text-2xl mr-3">📱</div>
                    <div>
                      <p className="text-sm text-white">Download on the</p>
                      <p className="font-medium text-white">Apple Store</p>
                    </div>
                  </a>
                  <a href="#" className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200">
                    <div className="text-2xl mr-3">📱</div>
                    <div>
                      <p className="text-sm text-white">Get it on</p>
                      <p className="font-medium text-white">Google Play</p>
                    </div>
                  </a>
                </div>
              </div>*/}
            </div>

            {/* Footer Links */}
            {/*footerSections.map((section) => (
              <div key={section.title}>
                <h5 className="text-lg font-semibold text-white mb-6">{section.title}</h5>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-white hover:text-white transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))*/}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-6 border-t border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center text-sm text-white">
                © {new Date().getFullYear()} Powered by
                <a
                  href="https://syntax-ai.tech"
                  className="mx-1 text-white font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Checkerist
                </a>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <Link href="#" className="text-white hover:text-white">Privacy</Link>
                <Link href="#" className="text-white hover:text-white">Terms</Link>
                <Link href="#" className="text-white hover:text-white">Site Map</Link>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6">
              {/* Language & Currency */}
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-sm font-medium text-white hover:text-white">
                  <Globe className="h-4 w-4 mr-1" />
                  <span className="underline">English (US)</span>
                </button>
                <button className="flex items-center text-sm font-medium text-white hover:text-white">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span className="underline">USD</span>
                </button>
              </div>

              {/* Social Links 
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                      aria-label={social.name}
                    >
                      {IconComponent}
                    </a>
                  );
                })}
              </div>*/}
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
