import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicialização segura
const resendApiKey = process.env.RESEND_API_KEY;

export async function POST(request: Request) {
  try {
    if (!resendApiKey) {
      console.error('RESEND_API_KEY não configurada no servidor.');
      return NextResponse.json({ error: 'Configuração de email pendente no servidor Vercel.' }, { status: 500 });
    }

    const resend = new Resend(resendApiKey);
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando.' }, { status: 400 });
    }

    console.log('Tentando enviar email via Resend para info@ e contato@ dfranca.arq.br');
    
    const result = await resend.emails.send({
      from: 'Daniel França Arquitetura <contato@dfranca.arq.br>',
      to: ['info@dfranca.arq.br', 'contato@dfranca.arq.br'],
      replyTo: email,
      subject: `Nova mensagem pelo site: ${subject || 'Sem assunto'}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #eee; padding-bottom: 10px; text-transform: uppercase; font-size: 16px; letter-spacing: 2px;">Novo Contato</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Assunto:</strong> ${subject}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-weight: bold;">Mensagem:</p>
          <div style="background: #fdfdfd; padding: 15px; border-left: 3px solid #1a1a1a; font-style: italic;">
            ${message.replace(/\n/g, '<br />')}
          </div>
          <p style="margin-top: 30px; font-size: 11px; color: #aaa; text-align: center; border-top: 1px solid #eee; pt-10;">
            Enviado via Resend API | Daniel Franca Arquitetura
          </p>
        </div>
      `,
    });

    if (result.error) {
      console.error('Erro detalhado do Resend:', result.error);
      return NextResponse.json({
        error: `Erro no provedor (Resend): ${result.error.message}`,
        details: result.error
      }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: result.data?.id });
  } catch (error: any) {
    console.error('Crash total na rota de email:', error);
    return NextResponse.json({ error: `Erro interno: ${error.message || 'Desconhecido'}` }, { status: 500 });
  }
}
