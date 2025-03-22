# Full Stack Comments app

This simple Project was made with Django and React.

## Functionality

- Simple **CRUD** app on Comments.

## Stack

### Backend

- Django
- Django Rest Framework

### Frontend

- React
- Axios
- Contexts
- Tailwind CSS
- TypeScript

## Running

Running this project and testing it locally is easy. Just follow these steps:

### Backend

First, you should create _virtual environment_ in the root directory, near `backend` and `frontend` folders. Next, install necessarry packages and run the server after some migrations.

```bash
python -m venv .venv
.venv\Scripts\activate # Windows
source .venv/bin/activate  # Macos and Linux

pip list

# Install from requirements:
pip install -r requirements.txt
# Or manually:
pip install django djangorestframework

cd backend

python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### Frontend

In the frontend part, things are much easier. Just install packages and run the website:

```bash
cd frontend
npm install
npm run dev
```

## Contributions

Feel free to contribute to this repository and explore the project!
