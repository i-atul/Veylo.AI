/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsHmrCache: false,
        serverActions: {
            bodySizeLimit: '10mb', 
        },
    },

    images:{
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'gzegzswoezbrihphvqdu.supabase.co',
            },
        ],       
    
    },
};

export default nextConfig;
