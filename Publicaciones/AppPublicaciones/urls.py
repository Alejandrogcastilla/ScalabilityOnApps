from django.urls import path
from django.contrib import admin
from .views import index, publicacion, delete_comentario, create_publicacion, delete_publicacion, registro, \
    login_request, logout_request

urlpatterns = [
    path('', index, name="Inicio"),
    path('<int:pk>', publicacion, name="publicacion"),
    path('delete/<int:pk>/<int:post>', delete_comentario, name="delete_comentario"),
    path('crear_publicacion', create_publicacion, name="create_publicacion"),
    path('delete_publicacion/<int:post>', delete_publicacion, name="delete_publicacion"),
    path("registro", registro, name="registro"),
    path("login", login_request, name="login"),
    path("logout", logout_request, name="logout"),

]
