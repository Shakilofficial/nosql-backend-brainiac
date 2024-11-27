import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1', router);

// Health Check
app.get('/', (req: Request, res: Response) => {
  res.status(200).send({
    status: true,
    message: '🌐 University Server is live 🚀',
  });
});

//global error handler
app.use(globalErrorHandler);

//Not Found 
app.use(notFound);

export default app;
