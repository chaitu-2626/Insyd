'use client';

import { useEffect } from 'react';
import { toast } from "react-toastify";
import { io } from 'socket.io-client';
import { useAuth } from "@clerk/nextjs";

// Listens for real-time notifications from the server via WebSockets and displays them as toast messages.
const SocketListener = () => {
    const { getToken } = useAuth();

    useEffect(() => {
        console.log('Socket initialized');
        const port = process.env.NEXT_PUBLIC_BACKEND_SOCKET_IO_URL;

        const socket = io(port, {
             transports: ['websocket'],
            auth: async (cb) => {
                const token = await getToken();
                cb({ token });
            },
        });


        socket.on('notify', (data) => {
            console.log('Received notification:', data);
            switch (data.type) {
                case 'like':
                    toast.info(data?.message ?? "Some one liked your post.");
                    break;
                case 'follow':
                    toast.info(data?.message ?? "Some one followed you.");
                    break;
                default:
                    console.log('Unknown notification type:', data.type);
            }
        });

        return () => {
            socket.off('notify');
        };
    }, [getToken]);

    return null;
}

// Exports the SocketListener component for use throughout the application.
export default SocketListener;
