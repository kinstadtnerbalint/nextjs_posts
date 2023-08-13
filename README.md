make two files in root folder
# 1. -> .env
    content: DATABASE_URL="file:./dev.db"

create github app (https://github.com/settings/apps)
# 2. -> .env.local
    content: 
        NEXTAUTH_SECRET=<generate secret (openssl rand -base64 32)>
        GITHUB_ID=<your_github_app_clientID>
        GITHUB_SECRET=<github_app_client_secret>
        URL=http://localhost:3000
```bash
npm install
#
npm run dev
```
