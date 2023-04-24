from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.dispatch import receiver
from django.conf import settings
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token

# Modificacion del usuario default de django adecuado a la aplicacion
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """Creates and saves a new user"""
        if not email:
            raise ValueError('El usuario debe contener email')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """Creates and saves a new superuser"""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

# Modelo de usuario base (atributos generales compartidos)
class User(AbstractBaseUser, PermissionsMixin):
    nombre = models.CharField(max_length=100, null=True)
    apellido = models.CharField(max_length=100, null=True)
    cedula = models.CharField(max_length=500, null=True)
    email = models.EmailField(max_length=80, unique=True)
    password = models.CharField(max_length=500, null=True)
    fecha_nacimiento = models.DateField(null=True)
    celular = models.CharField(max_length=500, null=True)
    direccion = models.CharField(max_length=500, null=True)
    is_admin = models.BooleanField('admin status', default=False)
    objects = UserManager()
    USERNAME_FIELD = 'email'

# creacion del token que permitira al usuario acceder a su url respectiva
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
