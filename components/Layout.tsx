import React, { ReactNode } from 'react';
import { FaGithub } from 'react-icons/fa';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/finder.png" alt="G-Finder Logo" className="h-8 w-8 mr-2" />
            <h1 className="text-xl font-bold">G-Finder</h1>
          </div>
        </div>
      </header>
      
      <main className="flex-grow bg-background">
        {children}
      </main>
      
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; {new Date().getFullYear()} G-Finder. Todos os direitos reservados.</p>
            </div>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 