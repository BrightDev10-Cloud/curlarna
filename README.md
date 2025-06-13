Project Overview

This project demonstrates a complete DevOps workflow by deploying a dynamic startup landing page to AWS EC2 using modern infrastructure practices.

Project Title: Curlarna (AI powered waste management)
Developer: Abdulazeez Bright Abu - Founder / Lead Engineer
Deployment: AWS EC2 Ubuntu Server with Nginx & SSL

🚀 Live Demo

🌐 Website URL: https://curlarna.xyz
📊 Project Status: ✅ Live and Running

Technology Stack

Cloud Provider: AWS EC2

Operating System: Ubuntu 22.04 LTS

Web Server: Nginx

Frontend: HTML5, CSS3, JavaScript, GSAP

SSL/TLS: Let's Encrypt (Certbot)

Version Control: Git & GitHub


📝 Project Requirements Met

✅ Server Provisioning: AWS EC2 Ubuntu instance

✅ Web Server: Nginx configuration with virtual hosts

✅ Dynamic Landing Page: Responsive design with animations

✅ Security: SSL certificate and firewall configuration

✅ Documentation: Comprehensive README with deployment steps

✅ Bonus: Reverse proxy setup for Node.js applications




🛠️ Deployment Steps

Phase 1: Infrastructure Setup

1.1 AWS EC2 Instance Creation

# Launch Ubuntu 22.04 LTS instance
# Instance Type: t2.micro (Free Tier)
# Security Groups: HTTP (80), HTTPS (443), SSH (22)

1.2 Connect to Server

# Download your key pair and set permissions
chmod 400 your-keypair.pem

# Connect via SSH
ssh -i your-keypair.pem ubuntu@your-public-ip

# Update system packages
sudo apt update && sudo apt upgrade -y

# Install essential packages
sudo apt install -y curl wget git unzip

Phase 2: Web Server Configuration

2.1 Install Nginx

# Install Nginx web server
sudo apt install nginx -y

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx

2.2 Configure Firewall
bash
# Configure UFW firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Verify firewall status
sudo ufw status
2.3 Setup Virtual Host
bash
# Create site configuration
sudo nano /etc/nginx/sites-available/your-site

# Content of the configuration file:

server {
    listen 80;
    server_name your-domain.com www.your-domain.com your-public-ip;
    root /var/www/your-site;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}

# Enable the site
sudo ln -s /etc/nginx/sites-available/your-site /etc/nginx/sites-enabled/

# Test configuration and reload
sudo nginx -t
sudo systemctl reload nginx

Phase 3: Application Deployment

3.1 Deploy Landing Page Files

# Create web directory
sudo mkdir -p /var/www/your-site

# Set permissions
sudo chown -R $USER:$USER /var/www/your-site
sudo chmod -R 755 /var/www

# Upload your HTML, CSS, and JS files

# (Use SCP, Git, or direct editing)


3.2 Bonus: Node.js Reverse Proxy Setup


# Install Node.js (if using reverse proxy)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Configure Nginx reverse proxy
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}


Phase 4: SSL Certificate Setup

4.1 Install Certbot

# Install Certbot for Let's Encrypt
sudo apt install certbot python3-certbot-nginx -y

4.2 Generate SSL Certificate

# Generate certificate for your domain
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# For IP-only setup (testing purposes)
sudo certbot certonly --standalone --preferred-challenges http -d your-public-ip

4.3 Auto-renewal Setup

# Test renewal process
sudo certbot renew --dry-run

# Check renewal timer
sudo systemctl status certbot.timer

Phase 5: Final Configuration

5.1 Security Hardening

# Disable unnecessary services
sudo systemctl disable apache2 (if installed)

# Configure SSH security
sudo nano /etc/ssh/sshd_config
# Set: PermitRootLogin no
# Set: PasswordAuthentication no

sudo systemctl restart sshd


5.2 Performance Optimization

# Configure Nginx for better performance
sudo nano /etc/nginx/nginx.conf
# Adjust worker_processes, client_max_body_size, etc.

# Enable gzip compression
gzip on;
gzip_types text/css application/javascript application/json application/font-woff application/font-tff image/gif image/png image/jpeg application/octet-stream;



