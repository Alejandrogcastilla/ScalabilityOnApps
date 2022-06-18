from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('publicaciones/', views.PublicacionList.as_view()),
    path('publicaciones/crear', views.CrearPublicacion.as_view()),
    path('publicaciones/<int:pk>/', views.PublicacionDetail.as_view()),
    path('comentarios/', views.ComentarioList.as_view()),
    path('comentarios/<int:pk>/', views.ComentarioDetail.as_view()),
    path('comentarios_publicacion/<int:pk>/', views.ComentariosPublicacion.as_view()),
    # path('categorias/', views.CategoriaList.as_view()),
    # path('categorias/<int:pk>/', views.CategoriaDetail.as_view()),
    path('api-auth/', include('rest_framework.urls')),
]

urlpatterns = format_suffix_patterns(urlpatterns)
