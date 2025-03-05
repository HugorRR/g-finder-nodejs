import React, { ReactNode, useState } from 'react';
import { FaGithub, FaInfoCircle, FaHome, FaQuestionCircle, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <img src="/finder.png" alt="G-Finder Logo" className="h-9 w-9" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">G-Finder</h1>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors flex items-center space-x-1.5 font-medium">
              <FaHome size={16} />
              <span>Início</span>
            </Link>
            <div className="relative">
              <button 
                className="text-gray-700 hover:text-primary transition-colors flex items-center space-x-1.5 font-medium"
                onClick={() => setIsAboutOpen(!isAboutOpen)}
              >
                <FaInfoCircle size={16} />
                <span>Sobre</span>
                <FaChevronDown size={12} className={`transform transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} />
              </button>
              {isAboutOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-card py-2 z-10 border border-gray-200 animate-fade-in">
                  <Link href="#" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-lightgray hover:text-primary rounded-lg mx-2 transition-colors">
                    Nossa Missão
                  </Link>
                  <Link href="#" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-lightgray hover:text-primary rounded-lg mx-2 transition-colors">
                    Como Funciona
                  </Link>
                </div>
              )}
            </div>
            <Link href="#" className="text-gray-700 hover:text-primary transition-colors flex items-center space-x-1.5 font-medium">
              <FaQuestionCircle size={16} />
              <span>Ajuda</span>
            </Link>
            <Link 
              href="/"
              className="btn-primary text-sm px-5 py-2"
            >
              Iniciar Captura
            </Link>
          </nav>
          
          <div className="md:hidden">
            <button 
              className="p-2 text-gray-700 focus:outline-none" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
        
        {/* Menu móvel */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-b border-gray-200 py-3 px-4 z-10 animate-slide-up">
            <div className="space-y-3">
              <Link href="/" className="block py-2.5 px-3 text-gray-700 hover:text-primary rounded-lg hover:bg-lightgray transition-colors">
                <div className="flex items-center space-x-3">
                  <FaHome size={18} />
                  <span className="font-medium">Início</span>
                </div>
              </Link>
              <button 
                className="flex items-center justify-between w-full py-2.5 px-3 text-gray-700 hover:text-primary rounded-lg hover:bg-lightgray transition-colors"
                onClick={() => setIsAboutOpen(!isAboutOpen)}
              >
                <div className="flex items-center space-x-3">
                  <FaInfoCircle size={18} />
                  <span className="font-medium">Sobre</span>
                </div>
                <FaChevronDown size={14} className={`transform transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isAboutOpen && (
                <div className="pl-12 space-y-2 animate-fade-in">
                  <Link href="#" className="block py-2 text-gray-600 hover:text-primary transition-colors">
                    Nossa Missão
                  </Link>
                  <Link href="#" className="block py-2 text-gray-600 hover:text-primary transition-colors">
                    Como Funciona
                  </Link>
                </div>
              )}
              
              <Link href="#" className="block py-2.5 px-3 text-gray-700 hover:text-primary rounded-lg hover:bg-lightgray transition-colors">
                <div className="flex items-center space-x-3">
                  <FaQuestionCircle size={18} />
                  <span className="font-medium">Ajuda</span>
                </div>
              </Link>
              
              <div className="pt-2">
                <Link 
                  href="/"
                  className="btn-primary w-full justify-center inline-flex"
                >
                  Iniciar Captura
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
      
      <main className="flex-grow py-8">
        {children}
      </main>
      
      <footer className="bg-text text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="animate-fade-in">
              <div className="flex items-center space-x-2 mb-4">
                <img src="/finder.png" alt="G-Finder Logo" className="h-8 w-8" />
                <h3 className="text-xl font-bold text-white">G-Finder</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Ferramenta avançada para captação de clientes no Google Maps, 
                ajudando seu negócio a crescer através de leads qualificados.
              </p>
            </div>
            <div className="animate-fade-in animation-delay-100">
              <h3 className="text-lg font-semibold mb-5 text-white/90">Links Rápidos</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    <span>Início</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    <span>Sobre Nós</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    <span>Ajuda e Suporte</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    <span>Termos de Serviço</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="animate-fade-in animation-delay-200">
              <h3 className="text-lg font-semibold mb-5 text-white/90">Contato</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-5">
                Tem dúvidas ou sugestões? Entre em contato conosco.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors bg-gray-800 hover:bg-gray-700 p-2.5 rounded-lg"
                  aria-label="GitHub"
                >
                  <FaGithub size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} G-Finder. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 