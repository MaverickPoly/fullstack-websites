from django.urls import path
from .views import *


urlpatterns = [
    path("user/profile/", UserProfileView.as_view(), name="user-profile"),
    path("register/", RegisterView.as_view(), name="register"),
    path("notes/", NoteListCreate.as_view(), name="note-list-create"),
    path("notes/<int:pk>/", NoteRetrieveUpdateDestroy.as_view(), name="note-detail"),
]
