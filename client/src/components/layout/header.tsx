import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, User, LogOut } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path: string) => location === path;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg className="w-8 h-8 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
          </svg>
          <Link href="/">
            <a className="text-xl font-bold text-neutral-800 font-inter">Mental Health Tracker</a>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/">
            <a className={`text-neutral-600 hover:text-primary-600 transition font-medium ${isActive('/') ? 'text-primary-600' : ''}`}>
              Home
            </a>
          </Link>
          {user && (
            <>
              <Link href="/chatbot">
                <a className={`text-neutral-600 hover:text-primary-600 transition font-medium ${isActive('/chatbot') ? 'text-primary-600' : ''}`}>
                  AI Companion
                </a>
              </Link>
              <Link href="/dashboard">
                <a className={`text-neutral-600 hover:text-primary-600 transition font-medium ${isActive('/dashboard') ? 'text-primary-600' : ''}`}>
                  Dashboard
                </a>
              </Link>
              <Link href="/resources">
                <a className={`text-neutral-600 hover:text-primary-600 transition font-medium ${isActive('/resources') ? 'text-primary-600' : ''}`}>
                  Resources
                </a>
              </Link>
            </>
          )}
        </nav>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <User size={16} />
                    <span>{user.name || user.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <a className="w-full cursor-pointer">Dashboard</a>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-red-500 cursor-pointer flex items-center gap-2"
                    onClick={() => logoutMutation.mutate()}
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link href="/auth">
              <Button className="hidden md:block">
                Sign In
              </Button>
            </Link>
          )}
          <Button 
            variant="default" 
            size="sm"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 px-4 py-3 shadow-md">
          <nav className="flex flex-col space-y-4">
            <Link href="/">
              <a 
                className={`text-neutral-600 hover:text-primary-600 transition font-medium py-2 ${isActive('/') ? 'text-primary-600' : ''}`}
                onClick={closeMenu}
              >
                Home
              </a>
            </Link>
            {user ? (
              <>
                <Link href="/chatbot">
                  <a 
                    className={`text-neutral-600 hover:text-primary-600 transition font-medium py-2 ${isActive('/chatbot') ? 'text-primary-600' : ''}`}
                    onClick={closeMenu}
                  >
                    AI Companion
                  </a>
                </Link>
                <Link href="/dashboard">
                  <a 
                    className={`text-neutral-600 hover:text-primary-600 transition font-medium py-2 ${isActive('/dashboard') ? 'text-primary-600' : ''}`}
                    onClick={closeMenu}
                  >
                    Dashboard
                  </a>
                </Link>
                <Link href="/resources">
                  <a 
                    className={`text-neutral-600 hover:text-primary-600 transition font-medium py-2 ${isActive('/resources') ? 'text-primary-600' : ''}`}
                    onClick={closeMenu}
                  >
                    Resources
                  </a>
                </Link>
                <Button 
                  variant="destructive" 
                  className="w-full justify-start"
                  onClick={() => {
                    logoutMutation.mutate();
                    closeMenu();
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/auth">
                <Button className="w-full" onClick={closeMenu}>
                  Sign In
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
