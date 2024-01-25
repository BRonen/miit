/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@mui/styled-engine': '@mui/styled-engine-sc',
    };
    return config;
  },
  transpilePackages: [
    '@miit/ui',
    '@mui/material',
    '@mui/system',
    '@mui/icons-material',
  ],
};
