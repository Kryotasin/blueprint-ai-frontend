import axios from '@/lib/axios';

export const figmaService = {
    // Load file structure from URL
    loadFile: async (figmaUrl: string) => {
        const fileKey = extractFileKey(figmaUrl);
        if (!fileKey) throw new Error('Invalid Figma URL');

        const response = await axios.get(`/figma/file/${fileKey}`);
        return response.data;
    },
};

function extractFileKey(url: string): string | null {
    const match = url.match(/figma\.com\/(?:file|design)\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
}