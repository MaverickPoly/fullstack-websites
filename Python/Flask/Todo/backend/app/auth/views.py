from app import db
from flask import request, jsonify
from flask_jwt_extended import jwt_required, create_access_token, set_access_cookies, unset_jwt_cookies, \
    get_jwt_identity

from . import auth_bp
from .models import User
from app import logger


@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        username = request.json.get("username")
        password = request.json.get("password")

        if not all([username, password]):
            return jsonify({"message": "All fields are required!"}), 400

        user = User.query.filter_by(username=username).first()
        if not user:
            return jsonify({"message": "Invalid username!"}), 400
        if not user.check_password(password):
            return jsonify({"message": "Invalid password!"}), 400

        access_token = create_access_token(identity=str(user.id))
        response = jsonify({"message": "Logged in successfully", "access_token": access_token})
        set_access_cookies(response, access_token)

        logger.info(f"Login success!")
        return response, 200
    except Exception as e:
        logger.error(f"Error logging in: {e}")
        return jsonify({"message": "Internal server error!"}), 500


@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        username = request.json.get("username")
        email = request.json.get("email")
        password = request.json.get("password")

        if not all([username, email, password]):
            return jsonify({"message": "All fields are required!"}), 400

        if User.query.filter_by(username=username).first():
            return jsonify({"message": "Username already exists!"}), 400
        if User.query.filter_by(email=email).first():
            return jsonify({"message": "Email already exists!"}), 400

        user = User(username=username, email=email)
        user.set_password(password)

        db.session.add(user)
        db.session.commit()

        logger.info(f"Registration success!")
        return jsonify({"message": "User registered successfully!"}), 201
    except Exception as e:
        logger.error(f"Error registering: {e}")
        return jsonify({"message:": "Internal server error!"}), 500


@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    try:
        response = jsonify({"message": "Logged out successfully!"})
        unset_jwt_cookies(response)
        logger.info(f"Logout success!")
        return response, 200
    except Exception as e:
        logger.error(f"Error logging out: {e}")
        return jsonify({"message": "Internal server error!"}), 500


@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def me():
    try:
        user_id = int(get_jwt_identity())
        user = User.query.get(user_id)
        logger.info(f"Profile fetched successfully!")
        return jsonify({"message": "Fetched profile successfully!", "data": user.to_dict()}), 200
    except Exception as e:
        logger.error(f"Error fetching `me` profile: {e}")
        return jsonify({"message": "Internal server error!"}), 500


@auth_bp.route("/users", methods=["GET"])
def all_users():
    try:
        users = User.query.all()
        logger.info(f"Fetched all users!")
        return jsonify({"message": "Fetched all user profiles successfully!", "data": [user.to_dict() for user in users]})
    except Exception as e:
        logger.error(f"Error fetching all users: {e}")
        return jsonify({"message": "Internal server error!"}), 500

