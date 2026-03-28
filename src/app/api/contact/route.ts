import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando.' }, { status: 400 });
    }

    // Usando Resend como o novo motor de disparo
    const { data, error } = await resend.emails.send({
      from: 'Daniel Franca Site <onboarding@resend.dev>', // Por padrão, o Resend usa este remetente enquanto você não valida um domínio próprio.
      to: [process.env.EMAIL_TO || 'contato@dfranca.arq.br'],
      replyTo: email,
      subject: `Nova mensagem pelo site: ${subject || 'Sem assunto'}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
          <h2 style="color: #1a1a1a; border-bottom: 1px solid #eee; padding-bottom: 10px;">Novo Contato عبر Site Institucional</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Assunto:</strong> ${subject}</p>
          <hr style="border: none; border-top: 1px solid #eee;" />
          <p><strong>Mensagem:</strong></p>
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 4px;">${message}</p>
          <footer style="margin-top: 20px; font-size: 12px; color: #888;">
            Este email foi gerado automaticamente pelo formulário de contato do seu site.
          </footer>
        </div>
      `,
    });

    if (error) {
      console.error('Erro de API no Resend:', error);
      return NextResponse.json({ error: 'Falha ao enviar via Resend.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Erro ao processar roteamento de email:', error);
    return NextResponse.json({ error: 'Falha ao enviar o email. Tente novamente.' }, { status: 500 });
  }
}
