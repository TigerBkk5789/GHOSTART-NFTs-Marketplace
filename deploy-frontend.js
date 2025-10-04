#!/usr/bin/env node

/**
 * GHOSTART NFT Marketplace - Frontend Deployment Script
 * This script provides multiple deployment options without requiring authentication
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 GHOSTART NFT Marketplace - Frontend Deployment');
console.log('==================================================');

// Check if build exists
if (!fs.existsSync('.next')) {
  console.log('📦 Building application...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ Build already exists');
}

// Create deployment options
const deploymentOptions = {
  '1': {
    name: 'Local Production Server',
    description: 'Start production server locally',
    command: 'npm start',
    port: 3000
  },
  '2': {
    name: 'Static Export (for GitHub Pages)',
    description: 'Create static export for GitHub Pages',
    command: 'npm run export',
    output: 'out'
  },
  '3': {
    name: 'Docker Deployment',
    description: 'Create Docker container',
    command: 'docker build -t ghostart-marketplace .',
    dockerfile: true
  },
  '4': {
    name: 'Manual Server Upload',
    description: 'Prepare files for manual server upload',
    command: 'npm run build',
    output: '.next'
  }
};

console.log('\n📋 Available Deployment Options:');
console.log('================================');

Object.entries(deploymentOptions).forEach(([key, option]) => {
  console.log(`${key}. ${option.name}`);
  console.log(`   ${option.description}`);
  if (option.port) {
    console.log(`   🌐 Will be available at: http://localhost:${option.port}`);
  }
  if (option.output) {
    console.log(`   📁 Output directory: ${option.output}`);
  }
  console.log('');
});

// Create Dockerfile if needed
if (!fs.existsSync('Dockerfile')) {
  console.log('🐳 Creating Dockerfile...');
  const dockerfile = `FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
`;

  fs.writeFileSync('Dockerfile', dockerfile);
  console.log('✅ Dockerfile created');
}

// Create export script for static deployment
if (!fs.existsSync('next.config.js')) {
  console.log('📄 Creating Next.js config for static export...');
  const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
`;

  fs.writeFileSync('next.config.js', nextConfig);
  console.log('✅ Next.js config created');
}

// Add export script to package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
if (!packageJson.scripts.export) {
  packageJson.scripts.export = 'next export';
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  console.log('✅ Export script added to package.json');
}

console.log('\n🎯 Quick Deployment Commands:');
console.log('=============================');
console.log('1. Local Production: npm start');
console.log('2. Static Export: npm run export');
console.log('3. Docker: docker build -t ghostart-marketplace . && docker run -p 3000:3000 ghostart-marketplace');
console.log('4. Manual Upload: Upload .next folder to your server');

console.log('\n📱 World Chain Integration:');
console.log('==========================');
console.log('✅ Trading banner with PUF link');
console.log('✅ Free NFT claim functionality');
console.log('✅ Token swap interface');
console.log('✅ World ID verification');
console.log('✅ Multi-language support');
console.log('✅ Mobile-optimized design');

console.log('\n🔗 Important Links:');
console.log('===================');
console.log('PUF Trading: https://worldcoin.org/mini-app?app_id=app_cc2463e69dbce149c2073d4ca593af75&path=app/token/0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990');
console.log('WLD Token: 0x2cFc85d8E48F8EAB294be644d9E25C3030863003');
console.log('GHOSTART Token: 0x4df029e25EA0043fCb7A7f15f2b25F62C9BDb990');
console.log('Pricing: 1 GHOSTART = $0.000009 USDT');

console.log('\n🎉 Your GHOSTART NFT marketplace is ready for deployment!');
console.log('Choose your preferred deployment method above.');
