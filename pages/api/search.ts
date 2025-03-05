import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { cep, keyword, clientCount } = req.body;

  if (!cep || !keyword || !clientCount) {
    return res.status(400).json({ message: 'Parâmetros inválidos' });
  }

  try {
    // Em um ambiente serverless como a Vercel, o uso do Puppeteer pode ser limitado
    // Esta é uma implementação simplificada que pode precisar ser adaptada
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto('https://www.google.com/maps/');

    // Buscar por CEP
    await page.waitForSelector('#searchboxinput');
    await page.type('#searchboxinput', cep);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);

    // Buscar por palavra-chave
    await page.click('#searchboxinput', { clickCount: 3 });
    await page.type('#searchboxinput', keyword);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);

    // Extrair resultados
    const results = [];
    const maxResults = Math.min(clientCount, 20); // Limitando a 20 para evitar problemas de timeout

    for (let i = 0; i < maxResults; i++) {
      try {
        // Esperar pelos resultados
        await page.waitForSelector('a[class*="hfpxzc"]', { timeout: 5000 });
        
        // Obter todos os elementos de resultado
        const elements = await page.$$('a[class*="hfpxzc"]');
        
        if (i >= elements.length) break;
        
        // Clicar no resultado
        await elements[i].click();
        await page.waitForTimeout(2000);
        
        // Extrair nome
        const nameElement = await page.waitForSelector('h1', { timeout: 5000 });
        const name = await nameElement.evaluate(el => el.textContent);
        
        // Tentar extrair telefone
        let phone = "Telefone não disponível";
        try {
          const phoneElement = await page.waitForSelector('button[data-item-id="phone:tel"]', { timeout: 3000 });
          phone = await phoneElement.evaluate(el => el.textContent);
        } catch (error) {
          // Telefone não encontrado
        }
        
        results.push({
          nome: name,
          telefone: phone
        });
        
      } catch (error) {
        console.error(`Erro ao extrair cliente ${i + 1}:`, error);
        continue;
      }
    }

    await browser.close();
    
    return res.status(200).json({ results });
  } catch (error) {
    console.error('Erro na API de busca:', error);
    return res.status(500).json({ message: 'Erro ao buscar dados', error: error.message });
  }
} 