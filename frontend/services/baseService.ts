import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

abstract class BaseApiService {
    protected static async getApi(token: string) {
        return axios.create({
            baseURL: BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    }
}

export default BaseApiService;