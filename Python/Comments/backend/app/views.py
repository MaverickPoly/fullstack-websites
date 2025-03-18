from flask import Blueprint


bp = Blueprint("main", __name__)


@bp.route("/")
def home():
    return "<h1>Hello world</h1>"



