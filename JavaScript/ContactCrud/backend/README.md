# Contact CRUD Backend

Contact CRUD application backend part, implemented in Express JS and Postgres Database (Local).

## Dependencies
* Express - Backend Framework
* Dotenv - To load environment variables
* Cors - To setup cors for application
* Pg - to work with Postgres database.
* Morgan - To log requests.

## Environment Variables
This is the `.env` file content of mine:
```
PORT=3000

PG_USER=postgres
PG_HOST=localhost
PG_DATABASE=postgres-express-contact-list
PG_PASSWORD=root
PG_PORT=5432
```

## Project Setup

### Installation
Install all the dependencies:
```
npm install
```

### Running Project
Run the project with predefined **nodemon** script:
```
npm run dev
```
