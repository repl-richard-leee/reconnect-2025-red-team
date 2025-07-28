#!/bin/bash
set -euxo pipefail

# Update system packages
sudo dnf update -y

# Install git
sudo dnf install -y git

# Install Node.js (using NodeSource repository for latest LTS)
curl -fsSL https://rpm.nodesource.com/setup_lts.x | bash -
sudo dnf install -y nodejs

# Install Yarn globally
sudo npm install -g yarn

# Setup SSH key for GitHub (assumes key is available in EC2 user data or instance metadata)
# You may need to configure SSH keys separately for private repo access

# Clone the repository
cd /home/ec2-user
sudo git clone https://github.com/repl-richard-leee/reconnect-2025-red-team.git

# Change ownership to ec2-user
chown -R ec2-user:ec2-user /home/ec2-user/reconnect-2025-red-team

# Navigate to server directory and start the application
cd /home/ec2-user/reconnect-2025-red-team/server

# Install dependencies
sudo -u ec2-user yarn install

# Create environment file with required variables
cat > /home/ec2-user/reconnect-2025-red-team/server/.env << EOF
SESSION_SECRET=$(openssl rand -base64 32)
PORT=80
EOF

# Change ownership of .env file
chown ec2-user:ec2-user /home/ec2-user/reconnect-2025-red-team/server/.env

# Install PM2 for process management
npm install -g pm2

# Start the server with PM2 as root for port 80 access
cd /home/ec2-user/reconnect-2025-red-team/server
pm2 start server.mjs --name "reconnect-2025-server"

# Save PM2 process list and configure startup as root
pm2 save
pm2 startup

# Note: Server now runs on port 80, update security group accordingly