from flask import Blueprint, request, jsonify
from app.models import Comment
from app import db

comments_bp = Blueprint("comments", __name__)


@comments_bp.route("/create", methods=["POST"])
def create_comment():
    username = request.json.get("username")
    image_url = request.json.get("image_url")
    comment = request.json.get("comment")
    title = request.json.get("title")

    if not all([username, image_url, comment, title]):
        return jsonify({"error": "All fields are required!"}), 400

    comment = Comment(username=username, image_url=image_url, comment=comment, title=title)
    db.session.add(comment)
    db.session.commit()
    return jsonify({"message": "Comment Created successfully!", "comment": comment.to_dict()}), 201


@comments_bp.route("/all", methods=["GET"])
def all_comments():
    comments = Comment.query.all()
    comments_list = [comment.to_dict() for comment in comments]
    return jsonify(comments_list)



@comments_bp.route("/<int:id>", methods=["GET"])
def comment_details(id):
    comment = Comment.query.get(id)

    if comment is None:
        return jsonify({"error": f"No such comment with id {id}"}), 404
    
    return jsonify(comment.to_dict())


@comments_bp.route("/<int:id>/delete", methods=["DELETE"])
def delete_comment(id):
    comment = Comment.query.get(id)

    if comment is None:
        return jsonify({"error": f"No such comment with id {id}"}), 404
    db.session.delete(comment)
    db.session.commit()
    return jsonify({"message": f"Delete comment {comment.title} successfully!"})


@comments_bp.route("/<int:id>/update", methods=["PUT"])
def update_comment(id):
    comment = Comment.query.get(id)
    username = request.json.get("username")
    image_url = request.json.get("image_url")
    comment_text = request.json.get("comment")
    title = request.json.get("title")

    if not all([username, image_url, comment_text, title]):
        return jsonify({"error": f"All fields are required!"}), 400

    if comment is None:
        return jsonify({"error": f"No such comment with id {id}"}), 404
    
    comment.username = username
    comment.image_url = image_url
    comment.comment = comment_text
    comment.title = title
    db.session.commit()
    return jsonify({"message": f"Updated comment with ID {comment.id} successfully!"})
