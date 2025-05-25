import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import { env } from '@config';
import routes from '@routes';
import { SocketService } from '@services';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});

// Setup middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.use('/api', requireAuth(), routes);

// Initialize Socket Service
SocketService.initialize(io);

server.listen(env.PORT, () => {
	console.log(`Server running on port ${env.PORT}`);
});
