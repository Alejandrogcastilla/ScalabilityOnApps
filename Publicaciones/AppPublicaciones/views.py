from django.shortcuts import render, redirect
from .models import Publicacion, Comentario
from .form import CommentForm, PublicacionForm, NewUserForm
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
import os


def index(request):
    publicaciones = Publicacion.objects.all().order_by('-fecha')
    return render(request, 'html/publicaciones.html', {'publicaciones': publicaciones})


def publicacion(request, pk):
    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            if request.user.is_authenticated:
                new_comment = Comentario.objects.create(descripcion=form.cleaned_data['descripcion'],
                                                        autor=request.user
                                                        , publicacion_id=pk)
                new_comment.save()
            else:
                return render(request, 'html/register.html')

    context = {'publicaciones': Publicacion.objects.filter(id=pk),
               'comentarios': Comentario.objects.filter(publicacion=pk).order_by('-fecha'),
               'form': CommentForm,
               'curret_publicacion': pk,
               'current_user': request.user.username,
               'current_post_user': str(Publicacion.objects.filter(id=pk)[0].autor)}

    return render(request, 'html/publicacion_detalle.html', context)


def create_publicacion(request):
    if request.method == 'POST':
        formPost = PublicacionForm(request.POST, request.FILES)
        if formPost.is_valid():
            new_publicacion = Publicacion.objects.create(titulo=formPost.cleaned_data['titulo'],
                                                         descripcion=formPost.cleaned_data['descripcion'],
                                                         imagen=request.FILES['imagen'], autor=request.user
                                                         )
            new_publicacion.save()
            return redirect('/inicio/')

    form = PublicacionForm()

    context = {'form': form}
    return render(request, 'html/create_publicacion.html', context)


def delete_publicacion(request, post):
    instance = Publicacion.objects.get(id=post)
    print(instance.imagen.path)
    os.remove(instance.imagen.path)
    instance.delete()
    return redirect('/inicio/')


def delete_comentario(request, pk, post):
    instance = Comentario.objects.get(id=pk)
    instance.delete()
    return redirect('/inicio/' + str(post))


def registro(request):
    if request.method == "POST":
        form = NewUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, "Registration successful.")
            return redirect('/inicio/')

        messages.error(request, "Unsuccessful registration. Invalid information.")
    form = NewUserForm()
    return render(request, "html/register.html", context={"register_form": form})


def login_request(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.info(request, f"You are now logged in as {username}.")
                return redirect('/inicio/')
            else:
                messages.error(request, "Invalid username or password.")
        else:
            messages.error(request, "Invalid username or password.")
    form = AuthenticationForm()
    return render(request, "html/login.html", context={"login_form": form})


def logout_request(request):
    logout(request)
    return redirect('/inicio/')
