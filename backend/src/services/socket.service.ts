import { Server as IOServer, Socket } from 'socket.io';
import { verifyToken } from '@clerk/express';
import { env } from '@config';
import {NotificationPayload, NotificationType} from '@types';


class SocketService {
    private static instance: SocketService;
    private io: IOServer | null = null;
    private connectedUsers: Map<string, string> = new Map();

    private constructor() { }

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    public initialize(io: IOServer) {
        this.io = io;

        io.on('connection', async (socket: Socket) => {
            const { token } = socket.handshake.auth;

            try {
                const verifiedToken = await verifyToken(token, {
                    jwtKey: process.env.CLERK_JWT_KEY,
                    authorizedParties: [env.NEXT_PUBLIC_FRONTEND_URL!],
                });

                if (!verifiedToken) {
                    throw new Error('Invalid token');
                    return;
                }

                socket.on('disconnect', () => {
                    for (const [uid, sid] of this.connectedUsers.entries()) {
                        if (sid === socket.id) {
                            this.connectedUsers.delete(uid);
                            console.log(`User ${uid} disconnected`);
                            break;
                        }
                    }
                });
            } catch (err) {
                console.error('Socket authentication failed', err);
                socket.disconnect(true);
            }
        });
    }

    public emit({fromUserName, toUserId, type }: NotificationPayload) {
        if(!this.io){
            return;
        }

        if(toUserId === 'all' && type === NotificationType.NEW_POST){
            this.io.emit('notify', { type, message: `User ${fromUserName} created a new post` });
            return;
        };

        const socketId = this.connectedUsers.get(toUserId);
        if (socketId) {
            const message = this.generateMessage(fromUserName, type);
            this.io.to(socketId).emit('notify', {
                type,
                message,
            });
        }
    }

    private generateMessage(toUserName: string, type: NotificationType): string {

        const message = {
            follow: () => `User ${toUserName} followed you.`,
            like: () => `User ${toUserName} liked your post.`,
            new_post: () => `User ${toUserName} created a new post.`
        }

        return message[type]();
    }
}

export default SocketService.getInstance();