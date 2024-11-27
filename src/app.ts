import cors from 'cors';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes


// Health Check
app.get('/', (req: Request, res: Response) => {
  res.status(200).send({
    status: true,
    message: '🌐 University Server is live 🚀',
  });
});

app.all('*', (req: Request, res: Response) => {
  res.status(404).send({
    status: false,
    message: '❌ Route not found ⚠️',
  });
});

export default app;
