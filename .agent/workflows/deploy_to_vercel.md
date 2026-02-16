
---
description: Guia de Deploy na Vercel
---

# Deploy na Vercel (Configuração Completa)

Este guia cobre como colocar o site no ar usando a Vercel, com suporte total ao Painel Administrativo e Integração Google Drive.

## 1. Pré-Requisitos
- Uma conta na [Vercel](https://vercel.com).
- O código deve estar em um repositório Git (GitHub, GitLab ou Bitbucket).
  - *Se ainda não subiu o código:* Crie um repositório no GitHub e faça o push de todos os arquivos.
  - **Importante**: Certifique-se de commitar o arquivo `package.json` atualizado, pois ele contém a dependência `googleapis` necessária para o Drive.

## 2. Criar Novo Projeto na Vercel
1. No dashboard da Vercel, clique em **Add New...** > **Project**.
2. Importe o repositório Git do seu projeto (Arch Office Site).
3. Na tela de configuração ("Configure Project"), você verá várias opções.
4. **Framework Preset**: Deixe como `Next.js`.
5. **Root Directory**: Deixe como `./` (raiz).

## 3. Variáveis de Ambiente (CRÍTICO)
Esta é a parte mais importante para que o Login e o Google Drive funcionem.
Na seção **Environment Variables**, adicione as seguintes chaves (exatamente como estão no seu `.env.local`):

| Chave | Valor (Exemplo / Onde encontrar) |
| :--- | :--- |
| `ADMIN_EMAIL` | `admin@archoffice.com` (Seu email de acesso) |
| `ADMIN_PASSWORD` | `senha123` (Sua senha de acesso) |
| `GOOGLE_CLIENT_EMAIL` | `seu-service-account@projeto...` (Do JSON do Google) |
| `GOOGLE_PRIVATE_KEY` | `-----BEGIN PRIVATE KEY-----...` (Do JSON do Google) |

**Atenção na Private Key**:
- Ao copiar a chave privada do JSON, certifique-se de copiar **todo** o conteúdo entre as aspas, incluindo `-----BEGIN PRIVATE KEY-----` e `-----END PRIVATE KEY-----`.
- A Vercel lida bem com as quebras de linha (`\n`), mas se tiver problemas, tente substituir as quebras de linha reais por `\n` literais.

## 4. Deploy
1. Clique em **Deploy**.
2. Aguarde o processo de build (pode levar alguns minutos na primeira vez).
3. Se der erro de build, verifique os logs. Um erro comum é esquecer de adicionar alguma libertat (como `googleapis`).

## 5. Pós-Deploy
- Assim que o site estiver no ar, você receberá um domínio (ex: `arch-office-site.vercel.app`).
- Acesse `/admin-dashboard` e tente fazer login.
- Teste a integração do Drive na aba Projetos.

## Solução de Problemas Comuns
- **Erro 500 no Google Drive**: Verifique se a variável `GOOGLE_PRIVATE_KEY` está correta. Às vezes, espaços extras ou quebras de linha incorretas causam falha na autenticação.
- **Login Falhando**: Verifique se `ADMIN_PASSWORD` está configurada corretamente nas variáveis de ambiente.
- **Estilos quebrados**: Certifique-se de que não haja erros de CSS no console do navegador.
