'use client';

import { useState, useEffect } from 'react';
import { PostApiService } from "@/services";
import { useUserSession } from '@/hooks';
import { Post } from "@/types";

const usePosts = (loggedInUserPostOnly: boolean) => {
    const { getUserToken } = useUserSession();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = await getUserToken();
                if (!token) throw new Error("Authentication token not found.");

                let data;
                if(loggedInUserPostOnly){
                    data = await PostApiService.getPostById(token);
                }else{
                    data = await PostApiService.getPosts(token);
                }

                setPosts(data);
            } catch (err: unknown) {
                console.error("Error fetching posts:", err);

                if (err instanceof Error) {
                    setError(err.message);
                    return;
                }

                setError("Failed to fetch posts.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [loggedInUserPostOnly, getUserToken]);

    return { posts, loading, error };
};

export default usePosts;