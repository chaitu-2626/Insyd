import { useAuth, useUser } from "@clerk/nextjs";
import { useCallback } from "react";

const useUserSession = () => {
    const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth()
    const { user, } = useUser();

    const getUserToken = useCallback(async () => {
        let token = null;
        try{
             token = await getToken();
        }catch(error){
            console.error("Error getting user token:", error);
        }
       
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