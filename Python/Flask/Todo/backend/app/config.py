from datetime import timedelta


class Config:
    SECRET_KEY = "my secret key"

    SQLALCHEMY_DATABASE_URI = "sqlite:///todo.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = "jwt secret key"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=60)
    JWT_COOKIE_SECURE = False
    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_COOKIE_CSRF_PROTECT = False
