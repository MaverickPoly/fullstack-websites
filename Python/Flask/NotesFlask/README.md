# Full Stack Notes App made with Python and React!

## Functionality

- Authentication with JWT.
- _CRUD_ operations on Notes.

## Technology Used

This project was made using one of the most popular tech stack.

### Backend

- Flask
- SQLAlchemy (For SQL database)
- Flask JWT Extended (for JWT authentication)
- Flask Migrate (for migrating database).
- Flask CORS (for setting up CORS).

### Frontend

- React
- React Router (for navigation)
- Tailwind CSS (for UI)
- Contexts (for states)
- Axios (for requests)
- Lucide React (for _lucide_ icons)

## How to Run?

### Backend

Create new **virtual environment**, then install all the required libraries in `requirements.txt` file:

```bash
python -m venv .venv
.venv\Scripts\activate # Windows
source .venv/bin/activate  # Macos and Linux

pip install -r requirements.txt
```

Finally, start the server by running `run.py` file.

```bash
python run.py
```

### Frontend

Here, you can just run `npm run dev` after `npm install` command.
