from django import forms
from .models import Comentario, Publicacion
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class PublicacionForm(forms.Form):
    titulo = forms.CharField(widget=forms.TextInput)
    descripcion = forms.CharField(widget=forms.Textarea)
    imagen = forms.ImageField()


class CommentForm(forms.Form):
    descripcion = forms.CharField(max_length=240)


class NewUserForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ("username", "email", "password1", "password2")

    def save(self, commit=True):
        user = super(NewUserForm, self).save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
        return user
