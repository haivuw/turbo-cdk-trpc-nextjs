const { TRPC_URL } = process.env;

if (!TRPC_URL) {
  throw new Error('TRPC_URL env var is missing');
}

module.exports = {
  reactStrictMode: true,
  experimental: {
    transpilePackages: ['ui'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${TRPC_URL}/:path*`, // Proxy to Backend
      },
    ];
  },
};
