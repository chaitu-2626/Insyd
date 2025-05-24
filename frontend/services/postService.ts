import BaseApiService from './baseService';
import { Post, CreatePostPayload } from '@/types';

class PostService extends BaseApiService {
	
	public async getPosts(token: string): Promise<Post[]> {
		const api = await BaseApiService.getApi(token);
		const response = await api.get('/posts');
		return response.data.data;
	}

	public async getPostById(token: string): Promise<Post[]> {
		const api = await BaseApiService.getApi(token);
		const response = await api.get('/posts/me');
		return response.data.data;
	}

	public async createPost(data: CreatePostPayload, token: string) {
		try {
			const api = await BaseApiService.getApi(token);
			const response = await api.post('/posts', data);
			return response.data;
		} catch (error: unknown) {
			console.error('Error creating post:', error);

			if (error instanceof Error) {
				return { success: false, error: error.message };
			}
			return { success: false, error: 'An unexpected error occurred.' };
		}
	}
}

const PostApiService = new PostService();
export default PostApiService;