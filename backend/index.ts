import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route de test avec typage (Request et Response)
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from TypeScript Backend on Windows!');
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});