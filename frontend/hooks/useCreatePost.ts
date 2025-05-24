'use client';

import { useState } from 'react';
import { PostApiService } from '@/services';
import { useUserSession } from '@/hooks';

interface CreatePostHandlerProps {
    onSuccess: () => void;
    onError: (errorMessage: string) => void;
}

const useCreatePost = ({ onSuccess, onError }: CreatePostHandlerProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { getUserToken, userId } = useUserSession();

    const handlePost = async (title: string, content: string) => {
        if (!title.trim() || !content.trim()) {
            onError('Please fill in both the title and content.');
            return;
        }

        setIsSubmitting(true);

        try {
            const token = await getUserToken();

            if (!userId || !token) {
                onError('Unable to find active session.');
                return;
            }

            const result = await PostApiService.createPost({ title, content, authorId: userId }, token);
            if (!result) throw new Error('Failed to create post.');

            if (result.success) {
                onSuccess();
                return;
            }

            onError(result.error || 'Failed to create post.');
        } catch (error: unknown) {
            console.error('Error creating post:', error);

            if (error instanceof Error) {
                onError(error?.message);
                return;
            }

            onError('An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return { isSubmitting, handlePost };
};

export default useCreatePost;