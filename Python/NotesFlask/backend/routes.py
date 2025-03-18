from flask import Blueprint, request, jsonify, current_app
from models import User, Note
from app import db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, create_refresh_token


views = Blueprint("views", __name__)


# Get All Notes
@views.route("/", methods=["GET", "POST"])
@jwt_required()
def get_notes():
    # print(f"Incoming request method: {request.method}")
    # print(f"Incoming request headers: {dict(request.headers)}")
    # print(f"Incoming request data: {request.data}")

    if request.method == "GET":
        user_id = get_jwt_identity()
        notes = Note.query.filter_by(user_id=user_id).all()
        return jsonify({"success": True, "notes": [note.to_dict() for note in notes]})
    elif request.method == "POST":
        user_id = get_jwt_identity()
        title = request.json.get("title")
        content = request.json.get("content")

        if not all([title, content]):
            return jsonify({"success": False, "error": "All fields are required!"}), 400
        
        note = Note(title=title, content=content, user_id=user_id)
        db.session.add(note)
        db.session.commit()
        return jsonify({"success": True, "message": "Note created successfully!", "note": note.to_dict()}), 201
    elif request.method == "OPTIONS":
        return jsonify({"success": True, "message": "Preflight OK"}), 200 


# # Create New Note
# @views.route("/", methods=["POST"])
# @jwt_required()
# def create_note():

# Get Specific Note
@views.route("/<int:id>", methods=["GET"])
@jwt_required()
def get_note(id):
    user_id = int(get_jwt_identity())
    note = Note.query.get(id)

    if not note or note.user_id != user_id:
        return jsonify({"success": False, "message": "Note not found or unauthorized"}), 403

    return jsonify({"success": True, "message": "Note found!", "data": note.to_dict()})


# Delete note
@views.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_note(id):
    user_id = int(get_jwt_identity())
    note = Note.query.get(id)

    if not note or note.user_id != user_id:
        return jsonify({"success": False, "message": "Note not found or unauthorized"}), 403

    db.session.delete(note)
    db.session.commit()
    return jsonify({"success": True, "message": "Note deleted successfully!"})


# Update Note
@views.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update_note(id):
    user_id = int(get_jwt_identity())
    title = request.json.get("title")
    content = request.json.get("content")
    note = Note.query.get(id)

    if not note or note.user_id != user_id:
        return jsonify({"success": False, "message": "Note not found or unauthorized"}), 403

    note.title = title
    note.content = content
    db.session.commit()
    return jsonify({"success": True, "message": "Note Updated successfully!", "data": note.to_dict()})


# ================== AUTH ========================

@views.route("/register", methods=["POST"])
def register():
    email = request.json.get("email")
    username = request.json.get("username")
    password = request.json.get("password")
    if not all([email, username, password]):
        return jsonify({"success": False, "message": "All fields are required!"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"success": False, "message": "Email already exists!"}), 400
    if User.query.filter_by(username=username).first():
        return jsonify({"success": False, "message": "Username already exists!"}), 400

    user = User(email=email, username=username)
    user.generate_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"success": True, "message": "User registered successfully!"}), 201


@views.route("/login", methods=["POST"])
def login():
    email = request.json.get("email")
    password = request.json.get("password")

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=str(user.id))
        refresh_token = create_refresh_token(identity=str(user.id))

        return jsonify({"access_token": access_token, "refresh_token": refresh_token, "user": user.to_dict(), "message": "Logged in successfully"})

    return jsonify({"message": "Invalid email or password"}), 401


@views.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    print("Access Token Refreshed!")
    return jsonify({"access_token": new_access_token})
