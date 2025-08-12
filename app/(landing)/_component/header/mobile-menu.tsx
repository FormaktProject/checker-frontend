"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu = ({ onClose }: MobileMenuProps) => {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    );
  };

  const menuItems = [
    {
      name: "Home",
      href: "/",
      hasChildren: false,
    },
    {
      name: "Find Checkers",
      href: "/check",
      hasChildren: false,
    },
  
    {
      name: "About us",
      href: "#about",
      hasChildren: false,
    },
   
    {
      name: "Contact",
      href: "#contact",
      hasChildren: false,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <Link href="/" onClick={onClose} className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="text-gray-900 text-xl font-bold">GoTrip</span>
        </Link>
        <button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.hasChildren ? (
                  <div>
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className="w-full flex items-center justify-between p-3 text-left text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <span className="font-medium">{item.name}</span>
                      {expandedMenus.includes(item.name) ? (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`block p-3 rounded-lg transition-colors duration-200 font-medium ${
                      isActive(item.href)
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200 space-y-4">
        <Link
          href="/become-checker"
          onClick={onClose}
          className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
        >
          Become Checker
        </Link>
        <Link
          href="/others-pages/signup"
          onClick={onClose}
          className="block w-full border border-gray-300 text-gray-900 text-center py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
        >
          Sign In / Register
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
