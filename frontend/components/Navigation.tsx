"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  Home,
  PlusCircle,
  User,
} from "lucide-react";

const Navigation = () => {
  const pathname = usePathname();  
  const router = useRouter();  

  const navItems = [
    { path: "/", icon: Home, label: "Timeline" },
    { path: "/create", icon: PlusCircle, label: "Create Post" },
    { path: "/all-users", icon: User, label: "All Users" },
  ];

  const handleLogout = () => {
    console.log("Logging out...");
    router.push("/");  
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Echo</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link key={path} href={path}>
                <Button
                  variant={pathname === path ? "default" : "ghost"}
                  className={`rounded-lg transition-colors ${
                    pathname === path
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
