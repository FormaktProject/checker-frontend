"use client"
import Image from 'next/image';
import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';

const TestimonialSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      designation: "Travel Blogger",
      avatar: "/img/tesmonelois/1.png",
      text: "The verification service gave me complete peace of mind. The checker confirmed everything about my accommodation before I booked. The place was exactly as described and completely safe. Really professional service."
    },
    {
      id: 2,
      name: "Michael Chen",
      designation: "Business Executive",
      avatar: "/img/tesmonelois/3 (1).png",
      text: "I was skeptical about booking online until I found this platform. Having a local checker verify the property beforehand saved me from a potential scam. The accommodation was perfect and secure."
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      designation: "Adventure Seeker",
      avatar: "/img/tesmonelois/4 (1).png",
      text: "As a solo female traveler, safety is my top priority. The verification process ensured my accommodation was in a safe area with proper security measures. I felt completely comfortable during my stay."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('testimonial-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div 
      id="testimonial-section"
      className={`grid grid-cols-1 mt-5 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Left Column */}
      <div className={`transition-all duration-1000 delay-200 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
      }`}>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
          What our customers are<br />saying about us?
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius
          tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo.
        </p>
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">13m+</div>
            <div className="text-gray-600">Happy People</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">4.88</div>
            <div className="text-gray-600 mb-2">Overall rating</div>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Testimonials */}
      <div className={`transition-all duration-1000 delay-400 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}>
        <div className="relative overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`transition-all duration-500 ${
                index === currentSlide 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-full absolute top-0 left-0 w-full'
              }`}
            >
              <div className="flex items-center space-x-4 mb-6">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div>
                  <h5 className="font-semibold text-gray-900">{testimonial.name}</h5>
                  <p className="text-gray-600">{testimonial.designation}</p>
                </div>
              </div>
              <p className="text-lg font-medium text-gray-900 leading-relaxed">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center mt-12 space-x-4">
          <span className="text-gray-900 font-medium">
            {String(currentSlide + 1).padStart(2, '0')}
          </span>
          <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${((currentSlide + 1) / testimonials.length) * 100}%` }}
            />
          </div>
          <span className="text-gray-900 font-medium">
            {String(testimonials.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
