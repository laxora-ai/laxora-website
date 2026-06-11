/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.ts',
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
}

export default nextConfig
