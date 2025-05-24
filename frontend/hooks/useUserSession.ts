import { useAuth, useUser } from "@clerk/nextjs";
import { useCallback } from "react";

const useUserSession = () => {
    const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth()
    const { user, } = useUser();

    const getUserToken = useCallback(async () => {
        const token = await getToken();
        return token;
    }, [getToken]);

    return {
        isLoaded,
        isSignedIn,
        userId,
        sessionId,
        getUserToken,
        user
    }
};

export default useUserSession