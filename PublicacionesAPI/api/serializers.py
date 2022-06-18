from rest_framework import serializers, permissions
from django.contrib.auth.models import User
from .models import Publicacion, Comentario#, Categoria


# Creamos el serializador del usuario
class UserSerializer(serializers.ModelSerializer):
    publicacion = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    comentario = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    # categorias = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'publicacion', 'comentario']


# Creamos el serializador de la publicación
class PublicacionSerializer(serializers.ModelSerializer):
    # autor = serializers.ReadOnlyField(source='autor.username')
    comentario = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Publicacion
        fields = ['id', 'titulo', 'descripcion', 'usuario', 'comentario', 'imagen', 'fecha']


class ComentarioSerializer(serializers.ModelSerializer):
    # autor = serializers.ReadOnlyField(source='autor.username')

    class Meta:
        model = Comentario
        fields = ['id', 'descripcion', 'usuario', 'identificador', 'fecha']


"""
class CategoriaSerializer(serializers.ModelSerializer):
    autor = serializers.ReadOnlyField(source='autor.username')
    publicacion = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Categoria
        fields = ['id', 'nombre', 'autor', 'publicacion']
"""
