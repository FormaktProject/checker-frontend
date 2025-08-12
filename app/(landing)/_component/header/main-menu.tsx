"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainMenuProps {
  style?: string;
}

const MainMenu = ({ style = "" }: MainMenuProps) => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", href: "/", hasChildren: false },
    { name: "Find Checkers", href: "/check", hasChildren: false },
    { name: "About us", href: "#about", hasChildren: false },
    { name: "Contact", href: "#contact", hasChildren: false },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="flex items-center">
      <ul className={`flex items-center space-x-8 ${style}`}>
        {menuItems.map((item, index) => (
          <li key={index} className="relative group">
            <Link
              href={item.href}
              className={`text-sm font-medium transition-colors duration-200 hover:text-gray-300 ${
                isActive(item.href) 
                  ? "text-white border-b-2 border-white pb-1" 
                  : "text-white/90"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainMenu;
