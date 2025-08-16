import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const { nome, email, suaEmpresa, mensagem } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mitchelmathias2904@gmail.com',
                pass: 'xpfjrspogjajryci'
            }
        });

        await transporter.sendMail({
            from: '"Logos" <mitchelmathias2904@gmail.com>',
            to: 'mitchel.mathias.dev@gmail.com',
            subject: 'Contato do site',
            text: `Nome: ${nome}\nEmail: ${email}\nEmpresa: ${suaEmpresa}\nMensagem: ${mensagem}`
        });

        res.status(200).json({ message: 'Email enviado com sucesso!' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
}
