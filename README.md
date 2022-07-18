# Project tracker | React, Typescript, GraphQL, MongoDB

Trello likes a project tracking app with kanban board and time management from Jira.

## Demo

[Deployed on Netlify (front-end) & Heroku (back-end)](https://project-tracker.kubahrom.dev/)

###### Free tier Heroku so the back-end app might be in an asleep mode which may take a few sec to wake up

## Built using

#### Front-end

- [ReactJS](https://reactjs.org/) - Frontend framework
- [Apollo Client](https://www.apollographql.com/) - State management library with GraphQL data fetching and cache
- [React Router](https://reactrouter.com/) - Library for general routing & navigation
- [React Hook Form](https://react-hook-form.com/) - Library for flexible & extensible forms
- [Material-UI w/ lots of CSS customisations](https://material-ui.com/) - UI library
- [Yup](https://github.com/jquense/yup) - Form validation tool
- [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) - Library for accessible drag and drop lists
- [Quill](https://quilljs.com/) - Rich text editor

#### Back-end

- [Node.js](https://nodejs.org/en/) - Runtime environment for JS
- [Apollo Server](https://www.apollographql.com/) - A stand-alone GraphQL server, including in a serverless environment
- [MongoDB](https://www.mongodb.com/) - NoSQL database to store data in JSON-like documents
- [mongoose](https://mongoosejs.com/) - Object modelling for MongoDB
- [JSON Web Token](https://jwt.io/) - A standard to secure/authenticate HTTP requests
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) - For hashing passwords
- [Dotenv](https://www.npmjs.com/package/dotenv) - To load environment variables from a .env file

## Features

- Authentication (login/register w/ email & password)
- CRUD projects, with ability to add members for group work
- CRUD issues, with title, description, type, asignees & priority
- Project members can add, edit, close & reopen issues etc.
- Project members can comment issues
- Dashboard with your projects and issues in which you are involved
- Filter and sort dashboard issues by various parameters
- Descriptive color indicators for bug priority & status
- Error management with descriptive messages
- Loading spinners for fetching processes
- Using cache for fast app responses
- Dark mode toggle w/ local storage save
- Proper responsive UI for all screens

## Screenshots

#### Desktop/Tablet

![Desktop-1](https://github.com/kubahrom/project-tracker/blob/main/screenshots/desktop-1.png)
![Desktop-2](https://github.com/kubahrom/project-tracker/blob/main/screenshots/desktop-2.png)
![Desktop-3](https://github.com/kubahrom/project-tracker/blob/main/screenshots/desktop-3.png)

#### Mobile

![Mobile-1](https://github.com/kubahrom/project-tracker/blob/main/screenshots/mobile-1.png)

## Usage

#### Env variable:

Create a .env file in server directory and add the following:

```
PORT = 5001
SECRET_KEY = "Your JWT secret"
FRONTEND_URL =
MONGODB = "MongoDB api key"
```

Create a .env file in client directory and add the following:

```
REACT_APP_SERVER_LOCATION =
```

#### Client:

Run client development server:

```
cd client
npm install
npm start
```

#### Server:

Open ormconfig.js & update the local PostgreSQL credentials to match with yours.

Run backend development server:

```
cd server
npm install
npm run dev
```
