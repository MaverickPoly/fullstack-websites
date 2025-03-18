# Simple Full Stack **Comments** App.

## Functionality

- Simple _CRUD_ operations on Comments.

## Technology Used

This project was made using Flask and React.

### Backend

- Flask
- SQLAlchemy (For SQL database)
- Flask Migrate (for migrating database).
- Flask CORS (for setting up CORS).

### Frontend

- React
- React Router (for navigation)
- Tailwind CSS (for UI)
- Contexts (for states)
- Axios (for requests)
- Lucide React (for Lucide Icons)

## How to Run?

### Backend

Create new **virtual environment** in the backend directory, then install all the required libraries in `requirements.txt` file:

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
