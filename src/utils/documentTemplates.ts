
export const getDocumentTemplate = (type: string, data: any) => {
    const currentDate = new Date().toLocaleDateString('pt-BR');

    const header = `
    <div style="margin-bottom: 2rem; border-bottom: 1px solid #333; padding-bottom: 1rem; display: flex; justify-content: space-between; align-items: flex-end;">
      <div>
        <h1 style="font-size: 24px; text-transform: uppercase; letter-spacing: 2px; margin: 0;">Daniel França</h1>
        <p style="font-size: 12px; opacity: 0.7; margin: 0.2rem 0 0 0;">ARQUITETURA E VISUALIZAÇÃO</p>
      </div>
      <div style="text-align: right; font-size: 12px;">
        <p style="margin: 0;">${currentDate}</p>
        <p style="margin: 0;">REF: ${data.project || 'PROJETO'}</p>
      </div>
    </div>
  `;

    const footer = `
    <div style="margin-top: 4rem; border-top: 1px solid #eee; padding-top: 1rem; font-size: 10px; color: #666; display: flex; justify-content: space-between;">
      <span>Daniel França Arquitetura</span>
      <span>${data.client || 'Cliente'}</span>
    </div>
  `;

    const commonStyles = `
    font-family: 'Helvetica', 'Arial', sans-serif;
    color: #333;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto;
    padding: 40px;
  `;

    let content = '';

    switch (type) {
        case 'welcome':
            content = `
        <h2 style="font-size: 18px; text-transform: uppercase; margin-bottom: 2rem; text-align: center;">Kit de Boas Vindas + Acesso</h2>
        <p>Prezado(a) <strong>${data.client || 'Cliente'}</strong>,</p>
        <p>Seja bem-vindo(a) ao Daniel França Arquitetura. É um prazer iniciar esta parceria.</p>
        <p>Este documento contém suas credenciais de acesso à nossa plataforma exclusiva, onde você poderá acompanhar o cronograma, visualizar prévias e realizar downloads dos arquivos finais.</p>
        
        <div style="background: #f4f4f4; padding: 2rem; margin: 2rem 0; text-align: center; border-radius: 8px;">
          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1rem;">Seu Número de Série de Acesso</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; font-family: monospace;">${data.serial || '----'}</div>
          <p style="font-size: 10px; margin-top: 1rem; color: #666;">Acesse: www.danielfranca.arq.br e use este código na área do cliente.</p>
        </div>

        <h3 style="font-size: 14px; text-transform: uppercase; margin-top: 2rem;">Canais de Comunicação</h3>
        <p>Para manter o fluxo de trabalho organizado e eficiente, centralizamos nossa comunicação:</p>
        <ul style="list-style: none; padding: 0;">
          <li style="margin-bottom: 0.5rem;"><strong>E-mail:</strong> contato@danielfranca.arq.br (Envio de arquivos e formalizações)</li>
          <li style="margin-bottom: 0.5rem;"><strong>WhatsApp:</strong> (Coordenação rápida e avisos)</li>
          <li style="margin-bottom: 0.5rem;"><strong>Plataforma:</strong> (Comentários diretos nas imagens)</li>
        </ul>

        <h3 style="font-size: 14px; text-transform: uppercase; margin-top: 2rem;">Próximos Passos</h3>
        <ol style="padding-left: 1.2rem;">
          <li>Preenchimento do Briefing (enviado em anexo ou via link);</li>
          <li>Envio dos arquivos base (DWG, 3D, referências);</li>
          <li>Início da modelagem/estudo de massa.</li>
        </ol>
      `;
            break;

        case 'proposal':
            content = `
        <h2 style="font-size: 18px; text-transform: uppercase; margin-bottom: 2rem; text-align: center;">Proposta Comercial</h2>
        
        <div style="margin-bottom: 2rem;">
          <h3 style="font-size: 14px; text-transform: uppercase; border-bottom: 1px solid #ddd; padding-bottom: 0.5rem;">1. Escopo</h3>
          <p>Produção de imagens de visualização arquitetônica para o projeto <strong>${data.project || '____'}</strong>, com foco em ${data.objective || 'apresentação e venda'}.</p>
        </div>

        <div style="margin-bottom: 2rem;">
          <h3 style="font-size: 14px; text-transform: uppercase; border-bottom: 1px solid #ddd; padding-bottom: 0.5rem;">2. Entregáveis</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 0.5rem;">• Quantidade: <strong>${data.quantity || '0'} imagens</strong> (${data.viewTypes || 'Externas/Internas'})</li>
            <li style="margin-bottom: 0.5rem;">• Resolução: <strong>${data.resolution || '4K/Ultra HD'}</strong></li>
            <li style="margin-bottom: 0.5rem;">• Formato: JPG/PNG/PDF</li>
          </ul>
        </div>

        <div style="margin-bottom: 2rem;">
          <h3 style="font-size: 14px; text-transform: uppercase; border-bottom: 1px solid #ddd; padding-bottom: 0.5rem;">3. Revisões</h3>
          <p>O processo inclui etapas de aprovação para garantir o alinhamento:</p>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 0.5rem;">• <strong>Estudo de Massa/Ângulo:</strong> Definição de câmeras e iluminação.</li>
            <li style="margin-bottom: 0.5rem;">• <strong>Prévia (White Model/Cor):</strong> Aprovação de materiais e atmosfera.</li>
            <li style="margin-bottom: 0.5rem;">• <strong>Rodadas de Ajustes Finais:</strong> ${data.revisions || '2'} rodadas de refino (pós-produção).</li>
          </ul>
          <p style="font-size: 11px; color: #888;">*Alterações de geometria/projeto após a aprovação da etapa anterior podem gerar custos adicionais.</p>
        </div>

        <div style="margin-bottom: 2rem;">
          <h3 style="font-size: 14px; text-transform: uppercase; border-bottom: 1px solid #ddd; padding-bottom: 0.5rem;">4. Prazo e Investimento</h3>
          <p><strong>Prazo estimado:</strong> ${data.deadline || '10'} dias úteis (após recebimento de todos os arquivos).</p>
          <p><strong>Investimento Total:</strong> R$ ${data.price || '0,00'}</p>
          <p><strong>Condições:</strong> 50% no aceite e 50% na entrega final.</p>
        </div>

        <div style="margin-top: 3rem; text-align: center; font-size: 12px;">
          <p>Proposta válida por 15 dias.</p>
        </div>
      `;
            break;

        case 'contract_arch':
        case 'contract_viz':
            content = `
        <h2 style="font-size: 18px; text-transform: uppercase; margin-bottom: 2rem; text-align: center;">Termos do Serviço</h2>
        
        <div style="margin-bottom: 1.5rem;">
          <h3 style="font-size: 12px; font-weight: bold; text-transform: uppercase;">1. Objeto</h3>
          <p>Prestação de serviços de ${type === 'contract_arch' ? 'arquitetura e desenvolvimento de projeto' : 'visualização arquitetônica (CGI)'}, conforme escopo detalhado na Proposta Comercial anexa.</p>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h3 style="font-size: 12px; font-weight: bold; text-transform: uppercase;">2. Processo e Aprovações</h3>
          <p>O trabalho segue um fluxo linear de aprovação. Após o aceite de uma etapa (ex: volumetria, materiais), o retorno para alteração da mesma implica em retrabalho, sujeito a orçamento adicional.</p>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h3 style="font-size: 12px; font-weight: bold; text-transform: uppercase;">3. Prazos</h3>
          <p>Os prazos contam-se em dias úteis e iniciam-se somente após o recebimento de todo o material necessário (DWG, referências, briefing) e do comprovante de pagamento inicial.</p>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h3 style="font-size: 12px; font-weight: bold; text-transform: uppercase;">4. Direitos Autorais e Uso de Imagem</h3>
          <p>O CONTRATADO mantém os direitos autorais intelectuais sobre as imagens produzidas. O CONTRATANTE recebe o direito de uso ilimitado para divugação, vendas e apresentações.</p>
          <p>O CONTRATADO reserva-se o direito de utilizar as imagens em seu portfólio pessoal e redes sociais para fins de divulgação do estúdio.</p>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h3 style="font-size: 12px; font-weight: bold; text-transform: uppercase;">5. Cancelamento</h3>
          <p>Em caso de cancelamento por parte do CONTRATANTE após o envio da primeira prévia, o valor da entrada (50%) não será reembolsado, a título de custeio das horas técnicas já executadas.</p>
        </div>
        
        <div style="margin-top: 3rem; display: flex; gap: 2rem; justify-content: space-between;">
          <div style="border-top: 1px solid #333; flex: 1; padding-top: 0.5rem; text-align: center;">Daniel França</div>
          <div style="border-top: 1px solid #333; flex: 1; padding-top: 0.5rem; text-align: center;">${data.client || 'Contratante'}</div>
        </div>
      `;
            break;

        case 'briefing':
            content = `
        <h2 style="font-size: 18px; text-transform: uppercase; margin-bottom: 2rem; text-align: center;">Briefing de Projeto</h2>
        <p style="font-size: 11px; text-align: center; margin-bottom: 2rem;">Este documento define as diretrizes criativas e técnicas. O preenchimento correto evita refações.</p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9; width: 30%;"><strong>Nome do Projeto</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${data.project || ''}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Localização</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${data.location || ''}</td>
          </tr>
           <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Fase do Projeto</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${data.phase || 'Estudo / Executivo'}</td>
          </tr>
        </table>

        <h3 style="font-size: 14px; text-transform: uppercase; margin-bottom: 0.5rem;">Objetivo e Público</h3>
        <p style="margin-bottom: 1rem;"><strong>Objetivo Principal:</strong> ${data.objective || 'Aprovação / Venda / Concurso'}</p>
        <p style="margin-bottom: 2rem;"><strong>Público-Alvo:</strong> ${data.targetAudience || 'Cliente Final / Investidor / Banca'}</p>

        <h3 style="font-size: 14px; text-transform: uppercase; margin-bottom: 0.5rem;">Diretrizes Artísticas</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
           <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9; width: 30%;"><strong>Atmosfera</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${data.atmosphere || 'Diurna / Ensolarada / Clean'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Estilo</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${data.style || 'Realista / Conceitual'}</td>
          </tr>
        </table>

         <h3 style="font-size: 14px; text-transform: uppercase; margin-bottom: 0.5rem;">Solicitações Específicas</h3>
         <p style="font-style: italic; font-size: 11px;">Restrições (o que NÃO mostrar), enquadramentos desejados, detalhes de paisagismo.</p>
         <div style="border: 1px solid #ddd; padding: 1rem; min-height: 100px; margin-bottom: 2rem;">${data.notes || ''}</div>
      `;
            break;

        case 'delivery':
            content = `
          <h2 style="font-size: 18px; text-transform: uppercase; margin-bottom: 2rem; text-align: center;">Termo de Entrega</h2>
          
          <div style="margin-bottom: 2rem;">
            <p>Concluímos a entrega do projeto <strong>${data.project || 'PROJECT NAME'}</strong>. Abaixo detalhamos os arquivos enviados e suas especificações.</p>
          </div>
  
          <div style="margin-bottom: 2rem;">
            <h3 style="font-size: 14px; text-transform: uppercase; border-bottom: 1px solid #ddd; padding-bottom: 0.5rem;">Arquivos Entregues</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 0.5rem;">• Imagens em Alta Resolução (300dpi) - Para Impressão</li>
              <li style="margin-bottom: 0.5rem;">• Imagens Otimizadas (72dpi) - Para Web/Social</li>
              <li style="margin-bottom: 0.5rem;">• <strong>Total:</strong> ${data.quantity || '0'} arquivos</li>
            </ul>
          </div>
  
          <div style="background: #f4f4f4; padding: 1.5rem; margin-bottom: 2rem; font-size: 11px;">
            <strong>Nota sobre Direitos de Uso:</strong><br/>
            O cliente tem licença total para uso comercial e divulgação das imagens. Os direitos de autoria intelectual permanecem com Daniel França Arquitetura, que poderá utilizar as imagens em seu portfólio, salvo acordo de confidencialidade prévio.
          </div>
  
          <div style="text-align: center; margin-top: 3rem;">
            <p>Agradecemos a confiança em nosso trabalho.</p>
            <p style="font-weight: bold;">www.danielfranca.arq.br</p>
          </div>
        `;
            break;

        default:
            content = `<p>Selecione um tipo de documento.</p>`;
    }

    return `
    <div style="${commonStyles}">
      ${header}
      ${content}
      ${footer}
    </div>
  `;
};
