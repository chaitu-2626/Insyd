import { io } from 'socket.io-client';
import { useAuth} from "@clerk/nextjs";

// Initializes and returns a Socket.IO client instance, authenticating with the user's session token.
const useSocket = () => {
    const { getToken } = useAuth();

    const port = process.env.NEXT_PUBLIC_BACKEND_SOCKET_IO_URL;
    const socket = io(port, {
        auth: async (cb) => {
            const token = await getToken();
            cb({ token });
        },
    });

    return socket;
};

export default useSocket;
