import { NextApiRequest, NextApiResponse } from 'next';
import * as XLSX from 'xlsx';

interface Cliente {
  nome: string;
  telefone: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { results } = req.body;

  if (!results || !Array.isArray(results) || results.length === 0) {
    return res.status(400).json({ message: 'Dados inválidos para exportação' });
  }

  try {
    // Criar uma planilha
    const worksheet = XLSX.utils.json_to_sheet(results);
    
    // Renomear as colunas
    XLSX.utils.sheet_add_aoa(worksheet, [['Nome', 'Telefone']], { origin: 'A1' });
    
    // Criar um livro e adicionar a planilha
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');
    
    // Gerar o arquivo
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    
    // Configurar os cabeçalhos da resposta
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=g-finder-results-${new Date().toISOString().split('T')[0]}.xlsx`);
    
    // Enviar o arquivo
    res.status(200).send(excelBuffer);
  } catch (error) {
    console.error('Erro na API de exportação:', error);
    return res.status(500).json({ message: 'Erro ao exportar dados', error: error.message });
  }
} 