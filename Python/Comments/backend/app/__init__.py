from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    cors = CORS(app)
    
    app.config["SECRET_KEY"] = "ejwdksla"
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"

    db.init_app(app)
    migrate.init_app(app, db)
    with app.app_context():
        db.create_all()

    from app.views import bp
    from app.comments import comments_bp

    app.register_blueprint(bp, url_prefix="/")
    app.register_blueprint(comments_bp, url_prefix="/comments")


    return app
