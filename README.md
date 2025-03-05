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
- **API Externa**: Google Maps API (Geocoding, Places)
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

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env.local` na raiz do projeto
   - Adicione sua chave API do Google Maps:
     ```
     GOOGLE_MAPS_API_KEY=sua_chave_api_aqui
     ```
   - Você pode obter uma chave API no [Google Cloud Console](https://console.cloud.google.com/)
   - Ative as APIs: Geocoding API, Places API

4. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## Implantação na Vercel

Esta aplicação está otimizada para implantação na Vercel. Para implantar:

1. Faça o fork deste repositório para sua conta GitHub
2. Crie uma conta na [Vercel](https://vercel.com/) se ainda não tiver
3. Na dashboard da Vercel, clique em "New Project"
4. Importe o repositório GitHub do G-Finder
5. Configure sua variável de ambiente:
   - Na tela de configuração do projeto, vá para a guia "Environment Variables"
   - Adicione a variável: `GOOGLE_MAPS_API_KEY` com seu valor
   - Você também pode usar os segredos da Vercel para isso:
     ```bash
     vercel secrets add google_maps_api_key "sua_chave_api_aqui"
     ```
6. Clique em "Deploy"
7. Após a implantação, acesse sua aplicação através da URL fornecida pela Vercel

## Estrutura do Projeto

```
g-finder/
├── components/        # Componentes React
├── pages/             # Páginas e API Routes
│   ├── api/           # Endpoints da API
│   │   ├── export.ts  # API para exportação XLSX
│   │   └── search.ts  # API para busca no Google Maps
│   ├── _app.tsx       # Config do Next.js app
│   └── index.tsx      # Página principal
├── public/            # Arquivos estáticos
├── styles/            # Estilos CSS/Tailwind
├── next.config.js     # Configurações do Next.js
├── vercel.json        # Configurações da Vercel
└── package.json       # Dependências e scripts
```

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

## Contato

Para sugestões, dúvidas ou contribuições, entre em contato através das issues do GitHub.
