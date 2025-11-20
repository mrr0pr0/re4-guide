/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    domains: ['https://supabase-re4rguide.cool.ropro.no/'],
    formats: ['image/avif', 'image/webp'],
  },

  // Enable compression
  compress: true,
};

export default nextConfig;
