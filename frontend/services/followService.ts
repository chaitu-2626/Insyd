import BaseApiService from "./baseService";

class FollowService extends BaseApiService {

    public async followUser(userId: string, token: string) {
        try {
            const api = await BaseApiService.getApi(token);
            const response = await api.post(`/follow/${userId}`);
            return response.data;
        } catch (error: unknown) {
            console.error('Error following user:', error);

            if (error instanceof Error) {
                return { success: false, error: error.message }
            }
            return { success: false, error: 'An unexpected error occurred while following user.' }
        }
    }

    public async unFollowUser(userId: string, token: string) {
        try {
            const api = await BaseApiService.getApi(token);
            const response = await api.delete(`/follow/${userId}`);
            return response.data;
        } catch (error: unknown) {
            console.error('Error unfollowing user:', error);

            if (error instanceof Error) {
                return { success: false, error: error.message }
            }
            return { success: false, error: 'An unexpected error occurred while unfollowing user.' }
        }
    }

    public async getFollowers(userId: string, token: string) {
        try {
            const api = await BaseApiService.getApi(token);
            const response = await api.get('/follow/followers');
            console.log(response.data);
            return response.data.data;
        } catch (error: unknown) {
            console.error('Error getting followers:', error);

            if (error instanceof Error) {
                return { success: false, error: error.message }
            }
            return { success: false, error: 'An unexpected error occurred while getting followers.' }
        }
    }

    public async getFollowing(userId: string, token: string) {
        try {
            const api = await BaseApiService.getApi(token);
            const response = await api.get('/follow/followees');
            console.log(response.data);
            return response.data;
        } catch (error: unknown) {
            console.error('Error getting following:', error);

            if (error instanceof Error) {
                return { success: false, error: error.message }
            }
            return { success: false, error: 'An unexpected error occurred while getting following.' }
        }
    }
}

const FollowApiService = new FollowService();

export default FollowApiService;