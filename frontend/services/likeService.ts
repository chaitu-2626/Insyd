import BaseApiService from "./baseService";

class LikeService extends BaseApiService {

    public async likePost (postId: string, token: string) {
        try {
            const api = await BaseApiService.getApi(token);
            const response = await api.post(`/like/${postId}`);
            return response.data;
        } catch (error: unknown) {
            console.error('Error liking post:', error);
    
            if (error instanceof Error) {
                return { success: false, error: error.message }
            }
            return { success: false, error: 'An unexpected error occurred while liking post.' }
        }
    }

    public async unLikePost (postId: string, token: string) {
        try {
            const api = await BaseApiService.getApi(token);
            const response = await api.delete(`/like/${postId}`);
            return response.data;
        } catch (error: unknown) {
            console.error('Error unliking post:', error);
    
            if (error instanceof Error) {
                return { success: false, error: error.message }
            }
            return { success: false, error: 'An unexpected error occurred while unliking post.' }
        }
    }

}
const LikeApiService =  new LikeService();
export default LikeApiService;