/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: ['localhost', 'res.cloudinary.com'],
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    async rewrites() {
        return [
          {
            source: '/one-music-api/:path*',
            destination: 'http://api.onemusicapi.com/:path*',
          },
          {
            source: '/musicbrainz/:path*',
            destination: 'https://musicbrainz.org/ws/2/:path*'
          }
        ]
    },
};

export default nextConfig;
