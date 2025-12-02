import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from './generated/prisma';

const app = express();
// 2. Créer une instance de Prisma
const prisma = new PrismaClient();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Route de test simple
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from TypeScript Backend!');
});

// --- NOUVELLES ROUTES POUR LA BASE DE DONNÉES ---

// 3. Récupérer toutes les tâches (GET)
// Note le "async" car la base de données prend du temps à répondre
app.get('/todos', async (req: Request, res: Response) => {
    try {
        const todos = await prisma.todo.findMany(); // Demande à Prisma de tout trouver
        res.json(todos); // Renvoie les données en format JSON
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des tâches" });
    }
});

// 4. Créer une nouvelle tâche (POST)
app.post('/todos', async (req: Request, res: Response) => {
    try {
        // On récupère le titre envoyé par le frontend (ou Postman)
        const { title } = req.body; 
        
        const newTodo = await prisma.todo.create({
            data: {
                title: title
            }
        });
        
        res.json(newTodo);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la création de la tâche" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});