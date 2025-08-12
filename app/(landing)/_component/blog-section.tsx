"use client"
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';
import { useState, useEffect } from 'react';

const BlogSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('blog-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "10 Amazing Places to Visit in 2024",
      excerpt: "Discover the most breathtaking destinations that should be on your travel list this year.",
      image: "/placeholder.svg?height=200&width=300",
      author: "John Doe",
      date: "March 15, 2024",
      category: "Travel Tips"
    },
    {
      id: 2,
      title: "Budget Travel: How to See the World for Less",
      excerpt: "Learn practical tips and tricks to travel more while spending less money.",
      image: "/placeholder.svg?height=200&width=300",
      author: "Jane Smith",
      date: "March 12, 2024",
      category: "Budget Travel"
    },
    {
      id: 3,
      title: "The Ultimate Packing Guide for Any Trip",
      excerpt: "Everything you need to know about packing efficiently for your next adventure.",
      image: "/placeholder.svg?height=200&width=300",
      author: "Mike Johnson",
      date: "March 10, 2024",
      category: "Travel Tips"
    }
  ];

  return (
    <div 
      id="blog-section"
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {blogPosts.map((post, index) => (
        <article 
          key={post.id}
          className={`bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          <div className="relative">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              {post.category}
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
              {post.title}
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default BlogSection;
