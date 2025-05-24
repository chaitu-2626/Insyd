import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from '@routes';
import { clerkMiddleware, requireAuth } from '@clerk/express';


const app = express();

// Global middlewares
app.use(cors());
app.use(express.json());

//The clerkMiddleware() function checks the request's cookies and headers for a session JWT and, if found, attaches the Auth object to the request object under the auth key.
app.use(clerkMiddleware());

// Health check route — public
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// Protect all `/api` routes — only accessible by authenticated users
app.use('/api', requireAuth(), routes);

// Optional: error handler for catching Clerk-related errors
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

export default app;
