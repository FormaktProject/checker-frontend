import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'

export default function ContactInfo() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Address */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-sm">
            <FaMapMarkerAlt className="text-blue-600 text-lg" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Address</h3>
        </div>
        <div className="text-gray-600 leading-relaxed pl-15">
          <p className="font-medium text-gray-800">Montplaisir</p>
          <p>Tunis, Tunisia</p>
          <p>1073</p>
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shadow-sm">
            <FaPhone className="text-green-600 text-lg" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
        </div>
        <div className="text-gray-600 pl-15">
          <p className="font-medium text-gray-800 mb-1">Customer Support</p>
          <a 
            href="tel:+21671234567" 
            className="text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
          >
            +216 71 234 567
          </a>
        </div>
      </div>

      {/* Email */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shadow-sm">
            <FaEnvelope className="text-purple-600 text-lg" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Email</h3>
        </div>
        <div className="text-gray-600 pl-15">
          <p className="font-medium text-gray-800 mb-1">Need support?</p>
          <a 
            href="mailto:support@verifyplace.com" 
            className="text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium break-all"
          >
            support@verifyplace.com
          </a>
        </div>
      </div>

      {/* Social Media */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shadow-sm">
            <FaInstagram className="text-orange-600 text-lg" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Follow Us</h3>
        </div>
        <div className="text-gray-600 mb-3 pl-15">
          <p className="font-medium text-gray-800">Stay connected</p>
        </div>
        <div className="flex gap-3 pl-15">
          <a 
            href="https://facebook.com" 
            className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            aria-label="Facebook"
          >
            <FaFacebookF className="text-sm" />
          </a>
          <a 
            href="https://twitter.com" 
            className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            aria-label="Twitter"
          >
            <FaTwitter className="text-sm" />
          </a>
          <a 
            href="https://instagram.com" 
            className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            aria-label="Instagram"
          >
            <FaInstagram className="text-sm" />
          </a>
          <a 
            href="https://linkedin.com" 
            className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn className="text-sm" />
          </a>
        </div>
      </div>
    </div>
  )
}
