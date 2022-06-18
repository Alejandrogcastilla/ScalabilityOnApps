import jwt
from rest_framework import authentication, exceptions
from django.conf import settings
from django.contrib.auth.models import User
from decouple import config

JWT_SECRET_KEY = config('JWT_SECRET_KEY')


class JWTAuthentication(authentication.BaseAuthentication):

    def authenticate(self, request):
        auth_data = authentication.get_authorization_header(request)
        if not auth_data:
            return None

        prefix, token = auth_data.decode('utf-8').split(' ')
        try:
            payload = jwt.decode(token, JWT_SECRET_KEY)
            user = User.objects.get(username=payload['username'])
            return user, token

        except jwt.DecodeError as identifier:
            raise exceptions.AuthenticationFailed('Token is invalid')
        except jwt.ExpiredSignatureError as identifier:
            raise exceptions.AuthenticationFailed('Token is expired')

        return super().authenticate(request)
