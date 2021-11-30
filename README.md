# React Candy Crush v1.11.1
<br />

## Basic Root User Deployment Guide For App Evaluation
###### This guide is intended for deployment testing purposes & it uses the Root user. Creating a new user is strongly suggested for a production setup.
<br />

### 1. Deploy a Cloud Compute Ubuntu 21.10 server from Vultr named "CandyCrush".
<br />

### 2. Open a PowerShell (as Admin) terminal & connect to your CandyCrush server's IP address via SSH:
`ssh root@enter.CandyCrush.IP.address`
<br />

**Enter the password provided by Vultr on the CandyCrush server page & follow all prompts until connected.**
<br />
<br />

### 3. Update Ubuntu OS:
`sudo apt update && sudo apt upgrade -y`
<br />
<br />

### 4. Enable & setup UFW Firewall:
`sudo ufw enable`
<br />

`sudo ufw status`
<br />

**It should display that the UFW Firewall is active.**
<br />

`sudo ufw allow ssh`
<br />

`sudo ufw allow http`
<br />

`sudo ufw allow https`
<br />

**Restart the CandyCrush server then reconnect via SSH (repeat step 2).**
<br />

`sudo reboot`
<br />
<br />

### 5. Install Node onto the server:
`curl -sL https://deb.nodesource.com/setup_17.x | sudo -E bash -`
<br />

`sudo apt install nodejs`
<br />

`npm --version`
<br />

**The NPM version should be displayed.**
<br />

`node --version`
<br />

**The Node version should be displayed.**
<br />
<br />

### 6. Clone the ReactCandyCrush GitHub repository to the CandyCrush server:
`cd ~/`
<br />

`mkdir superkloklabs`
<br />

`cd superkloklabs`
<br />

`git clone https://github.com/Superklok/ReactCandyCrush.git`
<br />
<br />

### 7. Install dependencies:
`cd ReactCandyCrush/v1.x.x/`
<br />

`npm i`
<br />

**Create a production build:**
<br />

`npm run build`
<br />
<br />

### 8. Start app using PM2:
`npm i pm2 -g`
<br />

**Set environment variables:**
<br />

`cd ~/`
<br />

`nano .bashrc`
<br />

**Add the following to the top of the file:**
<br />

`export PORT="ThePortCandyCrushIsRunningOn"`
<br />

`export NODE_ENV="production"`
<br />

**Press ctrl+x & save changes, then refresh the user environment:**
<br />

`source .bashrc`
<br />

**Double check that the new environment variables have been set correctly.**
<br />

`env`
<br />

**Then start the app:**
<br />

`cd superkloklabs/ReactCandyCrush/v1.x.x/`
<br />

`pm2 serve build/ ThePortCandyCrushIsRunningOn --name "CandyCrush" --spa`
<br />
<br />

### 9. Setup a start script to automatically start the app if the CandyCrush server is restarted:
`pm2 startup ubuntu`
<br />

`pm2 save`
<br />
<br />

### 10. Install & configure NGINX:
`sudo apt install nginx`
<br />

`sudo nano /etc/nginx/sites-available/default`
<br />

**Add the following to the location part of the server block:**
<br />

`server_name yourwebsite.com www.yourwebsite.com;`
<br />

&nbsp;&nbsp;&nbsp;&nbsp;`location / {`
<br />

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`proxy_pass http://localhost:ThePortCandyCrushIsRunningOn;`
<br />

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`proxy_http_version 1.1;`
<br />

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`proxy_set_header Upgrade $http_upgrade;`
<br />

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`proxy_set_header Connection 'upgrade';`
<br />

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`proxy_set_header Host $host;`
<br />

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`proxy_cache_bypass $http_upgrade;`
<br />

&nbsp;&nbsp;&nbsp;&nbsp;`}`
<br />

**Press ctrl+x & save changes.**
<br />

**Check NGINX config:**
<br />

`sudo nginx -t`
<br />

**Restart NGINX:**
<br />

`sudo service nginx restart`
<br />
<br />

### 11. Update your DNS "A" records for "yourwebsite.com" & "www.yourwebsite.com" with the CandyCrush server IP address.
<br />

### 12. Setup SSL with LetsEncrypt:
`sudo snap install core; sudo snap refresh core`
<br />

`sudo snap install --classic certbot`
<br />

`sudo ln -s /snap/bin/certbot /usr/bin/certbot`
<br />

`sudo certbot --nginx -d yourwebsite.com -d www.yourwebsite.com`
<br />

**Enter your@email.com for the email address it requests, & select (y)es, then (n)o.**
<br />

**Test the 90 day renewal process:**
<br />

`certbot renew --dry-run`
<br />

**Test the PM2 startup script by restarting the CandyCrush server:**
<br />

`sudo reboot`
<br />

**Then reconnect to the CandyCrush server via SSH (repeat step 2).**
<br />

**Check PM2 to make sure CandyCrush is still running:**
<br />

`pm2 status`
<br />

**Logout of SSH:**
<br />

`exit`
<br />
<br />
<br />

## DONE!
<br />

###### Languages

[<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />][javascript] [<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />][css] [<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />][html] [<img src="https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white" />][json] [<img src="https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white" />][markdown]

###### Libraries, Frameworks & Runtime

[<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />][react] [<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />][node] [<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />][npm]

###### Deployment Tools & Services

[<img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" />][nginx] [<img src="https://img.shields.io/static/v1?style=for-the-badge&message=Let%E2%80%99s+Encrypt&color=003A70&logo=Let%E2%80%99s+Encrypt&logoColor=FFFFFF&label=" />][letsencrypt] [<img src="https://img.shields.io/static/v1?style=for-the-badge&message=Vultr&color=007BFC&logo=Vultr&logoColor=FFFFFF&label=" />][vultr]

<br />
<br />

[javascript]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[css]: https://developer.mozilla.org/en-US/docs/Web/CSS
[html]: https://developer.mozilla.org/en-US/docs/Web/HTML
[json]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
[markdown]: https://www.markdownguide.org/getting-started/
[react]: https://reactjs.org/docs/getting-started.html
[node]: https://nodejs.org/en/docs/guides/
[npm]: https://docs.npmjs.com/cli/v7/commands/npm
[nginx]: https://docs.nginx.com/
[letsencrypt]: https://certbot.eff.org/
[vultr]: https://www.vultr.com/