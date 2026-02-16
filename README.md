# Studio Arch Site

Um site minimalista e sofisticado para escritório de arquitetura, com áreas dedicada para portfólio público, clientes e administração.

## Tecnologias

- **Next.js 15** (App Router)
- **TypeScript**
- **Vanilla CSS** (CSS Modules / Global Variables)
- **Lucide React** (Ícones)

## Estrutura do Projeto

- **Public Area (`/`)**: Portfólio, Sobre e Contato.
- **Login (`/login`)**: Ponto de acesso para clientes e administradores.
- **Área do Cliente (`/client-dashboard`)**: Acesso a cronagramas, uploads de arquivos e contratos.
- **Área Administrativa (`/admin-dashboard`)**: Gestão de clientes e projetos.

## Como Rodar

1. Certifique-se de ter o Node.js instalado.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse `http://localhost:3000`.

## Solução "Totalmente Gratuita"

Este projeto foi desenhado para ser hospedado gratuitamente:

- **Frontend**: Vercel (Hospedagem Gratuita).
- **Backend/Banco de Dados**: Para a versão final, recomenda-se integrar com **Firebase** (Plano Spark Gratuito) para Autenticação, Banco de Dados (Firestore) e Armazenamento de Arquivos.
- **Neste Demo**: A autenticação é simulada. Use qualquer email para entrar como cliente, ou inclua "admin" no email para ver o painel administrativo.
