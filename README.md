# MailScheduling

> Full stack application, which is used to send recurring mail using mongodb, express, reactjs, nodejs

> [Frontend Link](https://mailschedular.vercel.app/)
> [Server Api Doc Link](https://mailschedular.herokuapp.com/api-doc/)

## Usage

Clone app in your local


Add .env file and update values/setting to your own

```
NODE_ENV=dev
PORT=5000
MONGO_CONNECTION_STRING=
JWT_SECRET=
JWT_EXPIRY=30d
SERVICE=
EMAIL=
PASSWORD=
FROM_NAME=
FROM_EMAIL=
GOOGLE_CLIENT_ID=
```

## Install Dependencies

```
# project_folder/server
npm install

# project_folder/client
npm install
```

## Run App

```
# Run server
npm run dev

# Run Frontend
npm start
```

## Access

```
 # Access the web app in browser:
 http://localhost:3000

 # Access the Server:
 http://localhost:5000/
```

### Version: 1.0.0

# Project Specification

## Client 
> created with the help of react 

![dashboard](https://user-images.githubusercontent.com/49576577/123489862-88fd2d80-d630-11eb-908a-a7e8f3839b35.png)

### Main functionality
- Login signin feature
- Google-Login 
- create Mail schedular
- view History Mail
- view Panding Mail 
- design mail body 


## Backend
> Backend part serve all functionality including authentication, authrization create mail save data and much more .

## Main functionality
- Login signin Api
- google-login Api
- create mail Api
- send mail
- get sent mail
- get schedule mail
- cron-job
- save on database

![screencapture-localhost-5000-api-doc-2021-06-27-20_51_07](https://user-images.githubusercontent.com/49576577/123559470-cd680500-d7b9-11eb-9813-efd5772be5c9.png)

## Documentation

- Use Swagger to create documentation
- for swagger /api-docs for the api

## Security

- Encrypt passwords and reset tokens
- Use cors to make API public


## Code Related Suggestions

- NPM scripts for dev and production env
- Config file for important constants
- Use controller methods with documented descriptions/routes
- Error handling middleware
- Authentication middleware for protecting routes and setting user roles
- Validation using Mongoose and no external libraries
- Use TypeScript which primarily provides optional static typing, classes and interfaces. One of the big benefits is to enable IDEs to provide a richer environment for spotting common errors as you type the code 
