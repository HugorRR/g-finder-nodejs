import React, { useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaDownload, FaSpinner, FaBuilding, FaHistory, FaInfoCircle } from 'react-icons/fa';
import Layout from '@/components/Layout';

export default function Home() {
  const [cep, setCep] = useState('');
  const [keyword, setKeyword] = useState('');
  const [clientCount, setClientCount] = useState('10');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<Array<{ nome: string; telefone: string }>>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cep || !keyword || !clientCount) {
      alert('Por favor, preencha todos os campos');
      return;
    }
    
    setIsLoading(true);
    setProgress(0);
    setResults([]);
    
    try {
      // Simulando progresso
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 500);
      
      // Simulando a chamada à API
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cep,
          keyword,
          clientCount: parseInt(clientCount),
        }),
      });
      
      if (!response.ok) {
        throw new Error('Erro ao buscar dados');
      }
      
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Erro:', error);
      alert('Ocorreu um erro ao buscar os dados. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  };
  
  const handleExport = async () => {
    if (results.length === 0) {
      alert('Não há resultados para exportar');
      return;
    }
    
    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ results }),
      });
      
      if (!response.ok) {
        throw new Error('Erro ao exportar dados');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `g-finder-results-${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro:', error);
      alert('Ocorreu um erro ao exportar os dados. Por favor, tente novamente.');
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">G-Finder</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Capture leads qualificados do Google Maps para impulsionar seu negócio
          </p>
        </section>
        
        {/* Feature Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="card hover:border-primary/20 transition-all animate-slide-up">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <FaSearch className="text-primary text-lg" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Busca Inteligente</h3>
            <p className="text-gray-600 text-sm">
              Encontre potenciais clientes por palavra-chave e localização com resultados precisos.
            </p>
          </div>
          
          <div className="card hover:border-primary/20 transition-all animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <FaBuilding className="text-primary text-lg" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Dados Completos</h3>
            <p className="text-gray-600 text-sm">
              Obtenha informações detalhadas sobre os negócios encontrados na sua região.
            </p>
          </div>
          
          <div className="card hover:border-primary/20 transition-all animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <FaDownload className="text-primary text-lg" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Exportação Fácil</h3>
            <p className="text-gray-600 text-sm">
              Exporte os resultados para Excel e integre com suas ferramentas de marketing.
            </p>
          </div>
        </section>
        
        {/* Card Form */}
        <div className="card shadow-lg mb-8 border-t-4 border-t-primary">
          <h2 className="text-2xl font-bold mb-6">Comece a capturar leads agora</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label htmlFor="cep" className="block text-sm font-medium text-gray-700 mb-2">CEP da Região</label>
                <div className="input-field-group">
                  <div className="input-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <input
                    id="cep"
                    type="text"
                    className="input-field"
                    placeholder="00000-000"
                    value={cep}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 8) {
                        const formattedValue = value.length > 5 
                          ? `${value.slice(0, 5)}-${value.slice(5)}` 
                          : value;
                        setCep(formattedValue);
                      }
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Digite o CEP da área que deseja pesquisar
                </p>
              </div>
              
              <div>
                <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-2">Palavra-chave</label>
                <div className="input-field-group">
                  <div className="input-icon">
                    <FaSearch />
                  </div>
                  <input
                    id="keyword"
                    type="text"
                    className="input-field"
                    placeholder="Ex: Restaurantes, Lojas..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Tipo de negócio que deseja encontrar
                </p>
              </div>
              
              <div>
                <label htmlFor="clientCount" className="block text-sm font-medium text-gray-700 mb-2">Número de Clientes</label>
                <input
                  id="clientCount"
                  type="number"
                  min="1"
                  max="100"
                  className="input-field"
                  value={clientCount}
                  onChange={(e) => setClientCount(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Quantidade de resultados (máx: 100)
                </p>
              </div>
            </div>
            
            <div className="card-highlight mb-4">
              <div className="flex items-start space-x-3">
                <FaInfoCircle className="text-warning text-lg flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  A busca pode levar alguns instantes dependendo da quantidade de resultados solicitados. 
                  Aguarde a conclusão para visualizar todos os dados.
                </p>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn-primary w-full flex items-center justify-center shadow-button-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Buscando leads...
                </>
              ) : (
                <>
                  <FaSearch className="mr-2" />
                  Iniciar Captura de Leads
                </>
              )}
            </button>
          </form>
        </div>
        
        {isLoading && (
          <div className="mb-10 card animate-fade-in">
            <h3 className="font-semibold mb-3 flex items-center">
              <FaHistory className="mr-2 text-primary" /> 
              Progresso da Busca
            </h3>
            <div className="flex justify-between mb-1.5">
              <span className="text-sm font-medium text-gray-700">Buscando dados no Google Maps</span>
              <span className="text-sm font-medium text-primary">{progress}%</span>
            </div>
            <div className="progress-bar mb-4">
              <div 
                className="progress-bar-value" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">Aguarde enquanto coletamos as informações solicitadas...</p>
          </div>
        )}
        
        {results.length > 0 && (
          <div className="card shadow-lg mb-10 animate-slide-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">Resultados da Busca</h2>
                <p className="text-gray-600">
                  {results.length} {results.length === 1 ? 'lead encontrado' : 'leads encontrados'} para "{keyword}" em {cep}
                </p>
              </div>
              <button 
                onClick={handleExport}
                className="btn-accent flex items-center self-stretch md:self-center"
              >
                <FaDownload className="mr-2" />
                Exportar para Excel
              </button>
            </div>
            
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome do Estabelecimento
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Telefone de Contato
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {result.nome}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {result.telefone}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
} 