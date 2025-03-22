from django.db import models


class Comment(models.Model):
    title = models.CharField(max_length=200, null=False)
    content = models.TextField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    username = models.CharField(max_length=200, null=False)
    image_url = models.CharField(max_length=300, null=False)

    def __str__(self):
        return f"{self.title}"
    