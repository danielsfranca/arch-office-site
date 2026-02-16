
---
description: Como testar o fluxo de Geração e Entrega de Documentos
---

# Testando o Fluxo de Documentos (Admin -> Cliente)

Siga este passo a passo para validar a nova funcionalidade de geração e entrega de documentos.

## 1. Acesso Admin (Geração)
1. Acesse o **Painel Administrativo**: `http://localhost:3000/admin-dashboard`
2. Vá para a aba **Documentos**.
3. Selecione um tipo de documento (ex: "Kit de Boas Vindas").
4. Preencha os campos obrigatórios.
5. No campo "Cliente", selecione **Família Silva** (Isso é crucial para o vínculo).
6. Clique no botão **"Enviar p/ Cliente"**.
   - Você deve ver um alerta de sucesso confirmando o envio.

## 2. Acesso Cliente (Recebimento)
1. Abra uma nova aba anônima (ou normal) e acesse: `http://localhost:3000/client-dashboard`
2. Se aparecer a tela de "Bem-vindo", clique em "Arquitetura" ou "Visualização".
3. Insira o Serial do Cliente Teste: **A1B2**
4. Clique em "Acessar Meu Painel".
5. Vá para a aba **Entregas Finais**.
   - Você deve ver o documento que acabou de criar na lista.
   - O status estará como "Approved" (padrão para envio direto do admin).

## 3. Verificação de Persistência
1. Feche a aba do cliente e abra novamente.
2. O sistema deve lembrar seu acesso e não pedir o serial novamente (graças ao `localStorage`).

## Observações
- Os dados são salvos em `src/data/db.json`. Você pode resetar este arquivo se precisar limpar os testes.
- A lista de clientes no Admin agora vem deste mesmo arquivo JSON.
