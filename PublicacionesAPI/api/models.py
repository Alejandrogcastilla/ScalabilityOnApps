from django.db import models


# La clave foranea crea relaciones de n-1
# Related_name crea un acceso personalizado a un modelo

def upload_to(instance, filename):
    return 'imagenes/{filename}'.format(filename=filename)


class Publicacion(models.Model):
    fecha = models.DateTimeField(auto_now_add=True)
    titulo = models.CharField(max_length=100, blank=True, default='')
    descripcion = models.TextField(blank=True, default='')
    autor = models.ForeignKey('auth.User', related_name='publicacion', on_delete=models.CASCADE)
    usuario = models.CharField(max_length=100, blank=False)
    imagen = models.ImageField(upload_to=upload_to)

    class Meta:
        ordering = ['fecha']


class Comentario(models.Model):
    fecha = models.DateTimeField(auto_now_add=True)
    descripcion = models.TextField(blank=False)
    autor = models.ForeignKey('auth.User', related_name='comentario', on_delete=models.CASCADE)
    usuario = models.CharField(max_length=100, blank=False)
    identificador = models.IntegerField(blank=False)
    publicacion = models.ForeignKey('Publicacion', related_name='comentario', on_delete=models.CASCADE)

    class Meta:
        ordering = ['fecha']


"""
class Categoria(models.Model):
    nombre = models.CharField(max_length=100, blank=False, default='')
    autor = models.ForeignKey('auth.User', related_name='categorias', on_delete=models.CASCADE)
    publicacion = models.ManyToManyField('Publicacion', related_name='categorias', blank=True)

    class Meta:
        verbose_name_plural = 'categorias'
"""
