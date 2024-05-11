import { getGoogleOAuth } from "../utils/getGoogleOAuth";

export const GetGoogleOAuthRoute = {
    path: '/auth/google/url',
    method: 'get',
    handler: async (req, res) => {
        try {
            const url = await getGoogleOAuth();
            res.status(200).json({ url });
        } catch (error) {
            console.error('Error generating Google OAuth URL:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};