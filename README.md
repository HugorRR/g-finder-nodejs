# G-Finder

G-Finder é uma aplicação web para captação de clientes no Google Maps. Desenvolvida com Next.js e hospedada na Vercel, esta ferramenta permite buscar e extrair informações de contato de empresas e estabelecimentos com base em localização (CEP) e palavras-chave.

## Funcionalidades

- Busca por CEP e palavra-chave
- Extração de informações de contato (nome e telefone)
- Visualização dos resultados em uma tabela
- Exportação dos resultados para Excel (XLSX)
- Interface moderna e responsiva

## Tecnologias Utilizadas

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: API Routes do Next.js
- **Web Scraping**: Puppeteer
- **Exportação de Dados**: XLSX

## Como Executar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/g-finder.git
   cd g-finder
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## Implantação na Vercel

Esta aplicação está otimizada para implantação na Vercel. Para implantar:

1. Faça o fork deste repositório
2. Importe o projeto na Vercel
3. A Vercel detectará automaticamente as configurações do Next.js

## Limitações

- O uso do Puppeteer em ambientes serverless como a Vercel pode ter limitações de tempo de execução e recursos
- Para uso intensivo, considere implementar um serviço de scraping dedicado

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

## Contato

Para sugestões, dúvidas ou contribuições, entre em contato através das issues do GitHub.
