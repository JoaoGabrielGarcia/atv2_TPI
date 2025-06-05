# Sistema WB - Front-end

Este projeto é uma interface web moderna para o Sistema WB, desenvolvida com React, TypeScript, Vite e Tailwind CSS. Ele permite o cadastro, listagem e filtragem de clientes, produtos e serviços, com visual escuro e responsivo.

## Tecnologias Utilizadas

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router DOM](https://reactrouter.com/)

## Como rodar o projeto

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/) (recomendado v18 ou superior)
- [npm](https://www.npmjs.com/) (geralmente já vem com o Node)

### 2. Instalação

No terminal, navegue até a pasta do projeto e execute:

```bash
npm install
```

### 3. Rodando em modo desenvolvimento

```bash
npm run dev
```

O Vite irá mostrar no terminal o endereço local (geralmente http://localhost:5173) para acessar o sistema no navegador.

### 4. Build para produção

```bash
npm run build
```

Os arquivos finais ficarão na pasta `dist/`.

### 5. Visualizar build de produção localmente

```bash
npm run preview
```

---

## Estrutura do Projeto

- `src/pages/` — Páginas principais (Clientes, Produtos, Serviços)
- `src/components/` — Componentes reutilizáveis (Navbar, Modais, etc)
- `src/index.css` — Estilos globais e Tailwind
- `tailwind.config.js` — Configuração do Tailwind
- `vite.config.ts` — Configuração do Vite

---

## Observações

- Os dados são mantidos apenas em memória (mock), sem persistência em banco ou API.
- O projeto já está pronto para integração futura com back-end.
