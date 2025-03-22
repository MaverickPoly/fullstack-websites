# Full Stack Notes App implemented with **Django and React**

This Project was made to practice full stack web development with Python (for the backend) and JavaScript (for the frontend).

## Functionality

- Full _CRUD_ operations on Notes.
- Authentication with **JWT**
- Full Security System

## Tech Stack Used

### Backend

- Django
- Django Rest Framework
- Django Rest Framework Simple JWT

### Frontend

- React
- TypeScript
- React Router
- Tailwind CSS
- Axios
- Vite
- React Icons
- Contexts

Before diving in to this project, you need to have at least some knowledge in these technologies.

## Getting started

To run the app locally, you need to start both the _backend_ and the _frontend_.

### Backend

Initially, you should create a new virtual environment and activate it:

```bash
python -m venv .venv
.venv\Scripts\activate # Windows
source .venv/bin/activate  # Macos and Linux
```

Next, install all the required modules and frameworks stated in `requirements.txt` file:

```bash
pip install -r requirements.txt
```

Finally, you can now run the backend, after some migrations:

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### Frontend

In the frontend part, it is much easier. Just install packages and run the app:

```bash
cd frontend
npm install
npm run dev
```

Your backend will be running on http://127.0.0.1:8000, whereas frontend on http://localhost:5173/.

## Contribute.

Feel free to explore this awesome **full stack** project and make a contribution. You can fork repository, report an issue, make a pull request and star it!
