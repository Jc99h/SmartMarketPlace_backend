from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from core.models import *
from dateutil.relativedelta import relativedelta
import hashlib

# Autenticacion del usuario
class AuthTokenSerializer(serializers.Serializer):
    """serializer for the user authentication object"""
    email = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        """validate and authenticate the user"""
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password
        )
        if not user:
            msg = ('Imposible autenticar con esas credenciales')
            raise serializers.ValidationError(msg, code='authentication')
        attrs['user'] = user
        return attrs

# Crea el usuario dependiendo de la informacion dada(validated_data informacion recibida del formulario)
class UserSerializer(serializers.ModelSerializer):
    tipo = serializers.CharField(write_only=True)
    
    def create(self, validated_data):
        tipo = validated_data.pop('tipo')
        user = get_user_model().objects.create_user(**validated_data)
        if tipo == "Admin":
            password = validated_data.pop('password')
            hashedPass = hashlib.sha256()
            hashedPass.update(password.encode())
            fPass = hashedPass.hexdigest()
            user.is_admin = True
            user.password = fPass
            user.save()
        elif tipo == "Worker":
            password = validated_data.pop('password')
            hashedPass = hashlib.sha256()
            hashedPass.update(password.encode())
            fPass = hashedPass.hexdigest()
            user.is_admin = False
            user.password = fPass
            user.save()
        return user

    class Meta:
        model = get_user_model()
        fields = ("id", "tipo", "nombre", "apellido", "cedula", "email",
                  "password", "fecha_nacimiento", "celular", "direccion",
                  "is_admin", 
                  )
        
class UserPutSerializer(serializers.ModelSerializer):
    class Meta:
            model = User
            fields = ('id', 'nombre','apellido', 'cedula', 'email',
                    'fecha_nacimiento', 'celular', 'direccion',
                    )