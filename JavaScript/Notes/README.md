# Full Stack Notes App made with **MERN** stack.

## Functionality

- Authentication with JWT.
- _CRUD_ operations on Notes.

## Technology Used

This project was made using most modern and loved technologies.

### Backend

- Express JS
- Mongoose (for working with MongoDB)
- MongoDB (as a database)
- JsonWebToken (for concice authentication)

### Frontend

- React
- React Router (for navigation)
- Tailwind CSS (for UI)
- Contexts (for states)
- Axios (for requests)

## How to Run?

### Backend

Install all dependencies. Then run `npm run dev` command by navigating to backend folder to start the server.
Set the Environment Variables in the `.env` file in the backend folder:

```bash
PORT=3000
JWT_SECRET="my super secret key"
MONGODB_URI="mongodb://127.0.0.1:27017/notes"
```

### Frontend

Here, you can just run `npm run dev` command after `npm install`.
