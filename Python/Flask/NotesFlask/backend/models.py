from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timezone


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(200), nullable=False, unique=False)
    username = db.Column(db.String(200), nullable=False, unique=False)
    password = db.Column(db.String(300), nullable=False)
    notes = db.relationship("Note", backref="note")

    def __str__(self):
        return self.username
    
    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def generate_password(self, password):
        self.password = generate_password_hash(password)

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "password": self.password,
            "notes": [note.to_dict() for note in self.notes]
        }


class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False, default=datetime.now(timezone.utc))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    def __str__(self):
        return f"{self.user.username} - {self.title}"
    
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            "user_id": self.user_id,
        }
