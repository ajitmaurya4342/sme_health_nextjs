/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: 'http://localhost:3000',
        UPLOAD_TYPE: 'S3',
      },
};

export default nextConfig;
