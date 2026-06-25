const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // Instalação do pacote `helmet` para sanitização [cite: 13]
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// Middlewares de Segurança e Configuração
app.use(helmet()); // Proteção contra injeções maliciosas [cite: 29]
app.use(cors());
app.use(express.json());

// Rota Read: Listar todos os feedbacks (GET) [cite: 90]
app.get('/api/feedbacks', async (req, res) => {
    const feedbacks = await prisma.feedback.findMany();
    res.json(feedbacks);
});

// Rota Create: Salvar novo feedback (POST) [cite: 90]
app.post('/api/feedbacks', async (req, res) => {
    const { texto } = req.body;
    const novoFeedback = await prisma.feedback.create({
        data: { texto }
    });
    res.status(201).json(novoFeedback);
});

// Rota Delete: Remover feedback pelo ID (DELETE) [cite: 90]
app.delete('/api/feedbacks/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.feedback.delete({
        where: { id: parseInt(id) }
    });
    res.send('Feedback removido com sucesso');
});

// Iniciando o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000 (http://localhost:3000)');
});