from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
import logging

from .config import Config


logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    migrate = Migrate(app, db)
    jwt = JWTManager(app)
    CORS(app, supports_credentials=True)


    with app.app_context():
        db.create_all()

    # Import models
    from .auth.models import User
    from .todo.models import Todo

    from .auth.views import auth_bp
    from .todo.views import todo_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(todo_bp, url_prefix="/api/todos")

    return app
