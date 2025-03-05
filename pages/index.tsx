import React, { useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaDownload, FaSpinner } from 'react-icons/fa';
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">G-Finder</h1>
          <p className="text-gray-600">Captação de clientes no Google Maps</p>
        </div>
        
        <div className="card mb-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="cep" className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <input
                    id="cep"
                    type="text"
                    className="input-field pl-10"
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
              </div>
              
              <div>
                <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">Palavra-chave</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    id="keyword"
                    type="text"
                    className="input-field pl-10"
                    placeholder="Ex: Restaurantes, Lojas..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="clientCount" className="block text-sm font-medium text-gray-700 mb-1">Número de Clientes</label>
                <input
                  id="clientCount"
                  type="number"
                  min="1"
                  max="100"
                  className="input-field"
                  value={clientCount}
                  onChange={(e) => setClientCount(e.target.value)}
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn-primary w-full flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Buscando...
                </>
              ) : (
                <>
                  <FaSearch className="mr-2" />
                  Iniciar Captura
                </>
              )}
            </button>
          </form>
        </div>
        
        {isLoading && (
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Progresso</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {results.length > 0 && (
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Resultados ({results.length})</h2>
              <button 
                onClick={handleExport}
                className="btn-primary flex items-center"
              >
                <FaDownload className="mr-2" />
                Exportar XLSX
              </button>
            </div>
            
            <div className="overflow-auto max-h-96">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Telefone
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.map((result, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {result.nome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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