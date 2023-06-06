
# Xborg tech challenge

SIWE Authentication with NestJS and Nextjs for Xborg Tech challenge


## Contents
   press on the links below to read the respective read me files
- [Frontend Folder](https://github.com/michelfawazz/xborg-tech-challenge/tree/main/frontend)
- [Backend Folder](https://github.com/michelfawazz/xborg-tech-challenge/tree/main/BACKEND)




## Features List

#### Frontend
- [x]  Uses NextJS 
- [x]   Uses Metamask as the wallet
- [x]  Provides a “Signup” page to create an account
- [x]  Provides a “Signin” page to authenticate
- [x]  Provides a “Profile” page to display user details
- [x]  And a homepage that allows access to the relevant pages depending on the session status
- [x]  Session must be persistent between visits


#### Backend
- [x] Uses NestJS as the web framework
- [x] Uses SQLite as the database engine
- [x]  Uses TypeORM framework for database interactions
- [x]  Stores (at least) the following information about a user: Handle/Username, Ethereum Address
- [x]  Handles the SIWE protocol for authentication

- [x]  Handle registrations through `POST /user/signup`
- [x]  Handle authentication through `POST /user/signin`
- [x]  Exposes the user profile through `GET /user/profile`
- [x]  Uses JWT to authenticate private endpoints



## Authors

- [@michelfawazz](https://www.github.com/michelfawazz)

