/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
};
