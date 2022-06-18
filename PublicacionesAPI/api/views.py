from rest_framework import generics, permissions
from . import serializers
from django.contrib.auth.models import User
from .models import Publicacion, Comentario  # , Categoria
from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.views import APIView
import os


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer


class PublicacionList(generics.ListCreateAPIView):
    queryset = Publicacion.objects.all()
    serializer_class = serializers.PublicacionSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            post = self.request.POST
            usuario = User.objects.get(username=post['usuario'])
            serializer.save(autor=usuario)
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CrearPublicacion(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        print(request.data)
        serializer = serializers.PublicacionSerializer(data=request.data)
        if serializer.is_valid():
            usuario = User.objects.get(username=request.data['usuario'])
            serializer.save(autor=usuario)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def perform_create(self, serializer):
    #    serializer.save(autor=self.request.user)


class PublicacionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Publicacion.objects.all()
    serializer_class = serializers.PublicacionSerializer

    def destroy(self, request, *args, **kwargs):
        publicacion = self.get_object()
        os.remove(publicacion.imagen.path)
        publicacion.delete()
        return Response(data='delete success')


class ComentarioList(generics.ListCreateAPIView):
    queryset = Comentario.objects.all()
    serializer_class = serializers.ComentarioSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            post = self.request.POST
            usuario = User.objects.get(username=post['usuario'])
            get_publicacion = Publicacion.objects.get(pk=post['identificador'])
            serializer.save(autor=usuario, publicacion=get_publicacion)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ComentarioDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comentario.objects.all()
    serializer_class = serializers.ComentarioSerializer


class ComentariosPublicacion(generics.RetrieveAPIView):
    queryset = Comentario.objects.all()
    serializer_class = serializers.ComentarioSerializer

    def get(self, request, *args, **kwargs):
        pk = kwargs['pk']
        comentarios = Comentario.objects.filter(publicacion=pk).values()
        if comentarios:
            return Response(comentarios, status=status.HTTP_200_OK)
        else:
            return Response("El post no tiene comentarios", status=status.HTTP_404_NOT_FOUND)


"""
class CategoriaList(generics.ListCreateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = serializers.CategoriaSerializer

    def perform_create(self, serializer):
        serializer.save(autor=self.request.user)


class CategoriaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categoria.objects.all()
    serializer_class = serializers.PublicacionSerializer
"""
