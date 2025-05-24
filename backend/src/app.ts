import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import routes from './routes';
import { requireClerkAuth } from './middlewares/requireClerkAuth';

const app = express();

// Middleware setup
app.use(cors());
app.use(json());

// Health check route
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Clerk authentication (if you want to apply it globally)
app.use(requireClerkAuth);

// All routes under /api
app.use('/api', routes);

export default app;
