from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from datetime import timedelta

db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()


def create_app():
    app = Flask(__name__)

    app.config["SECRET_KEY"] = "hello world"
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///notes.db"
    app.config["JWT_SECRET_KEY"] = "my super secret key"

    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=15)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)


    db.init_app(app)
    # CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})
    # CORS(app, supports_credentials=True, allow_headers=["Authorization", "Content-Type"])
    CORS(app)

    jwt.init_app(app)
    migrate.init_app(app, db)

    with app.app_context():
        db.create_all()

    from routes import views
    app.register_blueprint(views, url_prefix="/api")
    
    return app
