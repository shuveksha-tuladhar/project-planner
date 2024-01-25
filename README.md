# Todo List

## Getting Started
- Clone this repository
- Set Up environment variable

  ```
    HOST=0.0.0.0
    PORT=1337
    APP_KEYS=<APPS_KEYS>
    API_TOKEN_SALT=<API_TOKEN_SALT>
    ADMIN_JWT_SECRET=<JWT_TOKEN>
    TRANSFER_TOKEN_SALT=<TRANSFER_TOKEN_SALT>
  
    # Database
    DATABASE_CLIENT=postgres
    DATABASE_HOST=127.0.0.1
    DATABASE_PORT=5432
    DATABASE_NAME=todolist
    DATABASE_USERNAME=<DB_USERNAME>
    DATABASE_PASSWORD=<DB_PASSWORD>
    DATABASE_SSL=false  
  ```

 
**Frontend**
- Change directory to frontend
```
cd frontend
```
- Install node libraries
```
npm install
```
- Run the frontend server on the port 3000.
```
npm run dev
```

**Backend**
- Change the directory to backend.
```
cd backend
```
- Install node libraries
```
npm install
```
- Run the backend server on the port 1337
```
npm run develop
```
