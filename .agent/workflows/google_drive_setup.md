
---
description: Guia de Configuração da Integração Google Drive
---

# Configuração do Google Drive

Para que a integração com o Google Drive funcione no Painel Administrativo, você precisa configurar as credenciais de acesso.

## 1. Criar Credenciais no Google Cloud Console
1. Acesse o [Google Cloud Console](https://console.cloud.google.com/).
2. Crie um novo projeto (ex: "Arch Office Site").
3. Ative a **Google Drive API**.
4. Vá em "Credenciais" > "Criar Credenciais" > **Conta de Serviço**.
5. Dê um nome (ex: "drive-service-account").
6. Após criar, entre na conta de serviço, vá na aba "Chaves" e crie uma nova chave **JSON**.
7. O download de um arquivo JSON iniciará automaticamente.

## 2. Configurar Variáveis de Ambiente
Abra o arquivo `.env.local` na raiz do projeto e adicione as seguintes linhas, copiando do JSON baixado:

```env
GOOGLE_CLIENT_EMAIL="seu-service-account-email@projeto.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSuaChavePrivadaAqui...\n-----END PRIVATE KEY-----\n"
```
*Dica: Mantenha as quebras de linha `\n` na chave privada ou copie exatamente como está no JSON.*

## 3. Compartilhar Pasta do Google Drive
1. Vá ao seu Google Drive.
2. Crie uma pasta raiz para o escritório (ex: "Daniel França Arquitetura (G:)").
3. Clique com o botão direito > Compartilhar.
4. Adicione o email da conta de serviço (`seu-service-account-email@projeto...`) como **Editor**.
   - Isso permite que o sistema leia e grave arquivos nessa pasta.

## 4. Instalar Dependências
Se ainda não instalou, rode no terminal:
```bash
npm install googleapis
```

## 5. Testar
1. Inicie o servidor: `npm run dev`
2. Vá ao Painel Administrativo > Aba Projetos.
3. Se tudo estiver correto, você verá as pastas do seu Google Drive listadas em vez dos dados fictícios.
