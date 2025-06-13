const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

const path = require('path');

app.use(express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.post('/email', async (req, res) => {
    try {
        const {nome,email,suaEmpresa,mensagem} = req.body;
        console.log(req.body);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user:'mitchelmathias2904@gmail.com',
                pass:'xpfjrspogjajryci'
            }
        })

        await transporter.sendMail({
            from: '"Logos" <mitchelmathias2904@gmail.com>',
            to: 'mitchel.mathias.dev@gmail.com',
            subject: 'Contato do site',
            text: `Nome: ${nome}\nEmail: ${email}\nTelefone: ${suaEmpresa}\nMensagem: ${mensagem}`
        })
        res.json({message: 'Email enviado com Sucesso'})
        
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));