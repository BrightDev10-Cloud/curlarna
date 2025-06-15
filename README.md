#Project Overview

This project is my submission for AltSchool Africa Second Semester Exams. It demonstrates a complete DevOps workflow by developing and deploying a dynamic startup landing page to AWS EC2 using modern infrastructure practices.

- Project Title: Curlarna (AI powered waste management)
- Owner: Abdulazeez Bright Abu
- Title: Founder / Lead Engineer
- Deployment: AWS EC2 Ubuntu Server with Nginx & SSL

##🚀 Live Demo

- 🌐 Website URL: http://curlarna.xyz/
- 📊 Project Status: ✅ Live and Running

##Technology Stack

- Cloud Provider: AWS EC2

- Operating System: Ubuntu 22.04 LTS

- Web Server: Nginx

- Frontend: HTML5, CSS3, JavaScript, GSAP

- SSL/TLS: Let's Encrypt (Certbot)

- Version Control: Git & GitHub

##📝 Project Requirements Met

- ✅ Server Provisioning: AWS EC2 Ubuntu instance

- ✅ Web Server: Nginx configuration with virtual hosts

- ✅ Dynamic Landing Page: Responsive design with some simple GSAP scroll animations

- ✅ Security: SSL certificate and firewall configuration

- ✅ Documentation: Comprehensive README with deployment steps

- ✅ Bonus: Reverse proxy setup for Node.js applications

##🛠️ Phase 1: Provisioning the Server

###1.1 AWS EC2 Instance Creation

- Login / Signup to AWS Account
- Open EC2 dashboard on AWS console
- Create new instance
  - Instance type: t2.micro, ubuntu 22.40 LTS
  - Create and download a new key pair (Take note of the folder the .pem file was downloaded to)
  - create security groups with these rules: Allow SSH traffic from Anywhere (0.0 0.0/0), Allow HTTPS traffic from the internet, Allow HTTP traffic from the internet | Security Groups: HTTP (80), HTTPS (443), SSH (22).

###1.2 Connect to Server

- open terminal
- cd path_to/the_folder_where_the.pem_file_lives
- set permission
- ```bash
  chmod 400 your-keypair.pem
  ```
- connect via SSH

```bash
ssh -i your-keypair.pem ubuntu@your-public-ip
```

-update system packages

```bash
sudo apt update && sudo apt upgrade -y
```

-install essential packages

```bash
sudo apt install -y curl wget git unzip
```

##🛠️ Phase 2: Web Server Configuration

###2.1 Install Nginx and start Nginx server

- Install Nginx
  ```bash
  sudo apt install Nginx
  ```
- Start and Enable Nginx

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

- check status

```bash
sudo systemctl status nginx
```

###2.2 Configure Firewall

- configure firewall settings
  ```bash
  sudo ufw OpenSSH
  sudo ufw allow 'Nginx Full'
  sudo ufw enable
  ```
- verify firewall status

```bash
sudo ufw status
```

###2.3 Setup Virtual Host

- create site configuration

```bash
sudo nano /etc/nginx/sites-available/curlarna | your-site
```

- content of the configuration file

```bash
server {
    listen 80;
    server_name curlarna.xyz www.curlarna.xyz; # ONLY your domain names here

    # The root directory for your website's files.
    # Make sure this path is correct to your actual index.html
    root /var/www/curlarna/curlarna;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }

}
```

- Enable the site

```bash
    sudo ln -s /etc/nginx/sites-available/your-site /etc/nginx/sites-enabled/
```

- Test configuration and reload

```bash
    sudo nginx -t
    sudo systemctl reload nginx
```

##🛠️ Phase 3: Application Deplyment

### 3.1 Uploading your applicatioon files to the server

- Create web directory

```bash
    sudo mkdir -p /var/www/curlarna | your-site
```

- Set Permissions to allow nginx access the web directory

```bash
    sudo chown -R www-data:www-data /var/www/curlarna | your-site
    sudo chmod -R 755 /var/www
```

- Initialize Git on your server

```bash
sudo git init
```

- Copy the Files from GitHub to your server

```bash
sudo git clone <remote_repo_url>
```

### 3.2 Bonus Node.js Reverse Proxy Setup

- Install Node.js (If using reverse proxy)
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```
- Configure Nginx Reverse Proxy

```bash
   location / {
   proxy_pass http://localhost:3000;
   proxy_http_version 1.1;
   proxy_set_header Upgrade $http_upgrade;
   proxy_set_header Connection 'upgrade';
   proxy_set_header Host $host;
   proxy_cache_bypass $http_upgrade;
}
```

##🛠️ Phase 4: SSL Certificate Setup

- Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

- Generate SSL Certificate

```bash
   sudo certbot --nginx -d curlarna.xyz -d www.curlarna.xyz
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

-If you don't have a domain name yet use IP-only setup (testing purposes)

```bash
sudo certbot certonly --standalone --preferred-challenges http -d your-public-ip
```

### 4.1 Auto-renewal Setup

- Test renewal process

```bash
    sudo certbot renew --dry-run
```

- check renewal timer

```bash
    sudo systemctl status certbot.timer
```

##🛠️ Phase 5: Final configurations

### 5.1 Security Hardening

- Disable unnecessary services

```bash
     sudo systemctl disable apache2 (if installed)
```

- Configure SSH security

```bash
    sudo nano /etc/ssh/sshd_config
    # Set: PermitRootLogin no
    # Set: PasswordAuthentication no

    sudo systemctl restart sshd
```

### 5.2 Performance Optimization

- Configure Nginx for better performance

```bash
    sudo nano /etc/nginx/nginx.conf
# Adjust worker_processes, client_max_body_size, etc.
```

- Enable gzip compresions

```bash
    gzip on;
    gzip_types text/css application/javascript application/json application/font-woff application/font-tff image/gif image/png image/jpeg        application/octet-stream;
```

## Phase 6 Connecting your public_IP address with custom domain-name (Namecheap example)

- Open the dashboard of your domain name vendor, in my case namecheap.
- Go to the Domain List >> Manage Domain >>Advanced DNS >> Host Records
- Edit the Type for both hosts (@ & www) to "A Record"
- Set the value for both hosts (@ & www) to the public_IPV4_address from your Server in AWS
- Set TTL to automatic
- Save and exit. (Note that it takes some time for the DNS to resolve, in my case it took 0ver 60 Minutes after a gazillion hot refreshes on the browser 😂😂😂)

## Some Screenshots

- Before SSL/TLS certificate
  
