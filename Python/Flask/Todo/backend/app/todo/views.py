from . import todo_bp
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from .models import Todo
from app import db
from app import logger


@todo_bp.route("/", methods=["POST"])
@jwt_required()
def create_todo():
    try:
        title = request.json.get("title")
        user_id = int(get_jwt_identity())

        todo = Todo(title=title, user_id=user_id)

        db.session.add(todo)
        db.session.commit()

        logger.info(f"Create todo success!")
        return jsonify({"message": "Created todo successfully!", "data": todo.to_dict()}), 201
    except Exception as e:
        logger.error(f"Error Creating todo: {e}")
        return jsonify({"message": "Internal server error!"}), 500


@todo_bp.route("/", methods=["GET"])
@jwt_required()
def get_todos():  # Get all todos of a user
    try:
        user_id = int(get_jwt_identity())
        todos = Todo.query.filter_by(user_id=user_id)
        logger.info(f"Fetch todo success")
        return jsonify({"message": "Fetched todos successfully!", "data": [todo.to_dict() for todo in todos]}), 200
    except Exception as e:
        logger.error(f"Error fetching todos: {e}")
        return jsonify({"message": "Internal server error!"}), 500


@todo_bp.route("/<int:todo_id>", methods=["GET"])
@jwt_required()
def get_todo(todo_id: int):  # Get a todo with id
    try:
        user_id = int(get_jwt_identity())
        todo = Todo.query.filter_by(user_id=user_id, id=todo_id).first()
        if not todo:
            return jsonify({"message": "Todo not found!"}), 404
        logger.info(f"Fetch todos success")
        return jsonify({"message": "Fetched todo successfully!", "data": todo.to_dict()}), 200
    except Exception as e:
        logger.error(f"Error fetching a todo: {e}")
        return jsonify({"message": "Internal server error!"}), 500


@todo_bp.route("/<int:todo_id>", methods=["PUT"])
@jwt_required()
def update_todo(todo_id: int):  # Get a todo with id
    try:
        user_id = int(get_jwt_identity())
        todo = Todo.query.filter_by(user_id=user_id, id=todo_id).first()
        if not todo:
            return jsonify({"message": "Todo not found!"}), 404
        title = request.json.get("title")
        completed = request.json.get("completed")
        if title:
            todo.title = title
        if completed is not None:
            todo.completed = completed
        db.session.commit()
        logger.info(f"Update todo successfully")
        return jsonify({"message": "Updated todo successfully!", "data": todo.to_dict()}), 200
    except Exception as e:
        logger.error(f"Error updating a todo: {e}")
        return jsonify({"message": "Internal server error!"}), 500


@todo_bp.route("/<int:todo_id>", methods=["DELETE"])
@jwt_required()
def delete_todo(todo_id: int):  # Get a todo with id
    try:
        user_id = int(get_jwt_identity())
        todo = Todo.query.filter_by(user_id=user_id, id=todo_id).first()
        if not todo:
            return jsonify({"message": "Todo not found!"}), 404
        db.session.delete(todo)
        db.session.commit()
        logger.info(f"Deleted todo successfully")
        return jsonify({"message": "Deleted todo successfully!", "data": todo.to_dict()}), 200
    except Exception as e:
        logger.error(f"Error deleting a todo: {e}")
        return jsonify({"message": "Internal server error!"}), 500
