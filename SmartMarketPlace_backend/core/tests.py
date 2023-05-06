from django.test import TestCase, LiveServerTestCase
from rest_framework.authtoken.models import Token
# from django.contrib.auth.models import User
from core.models import User
import json
import requests
import time
import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# Create your tests

# Clase para hacer pruebas unitarias y de integración
class TestUserView(LiveServerTestCase):
    def setUp(self):
        # Crea un usuario de prueba y un token de autenticación
        self.email = 'pg@gmail.com'
        self.password = 'testpass'
        # highest_id = User.objects.latest('id').id
        # new_id = highest_id + 1
        self.user = User.objects.create(
            # id=new_id,
            email=self.email,
            password=self.password
        )
        self.token = Token.objects.get_or_create(user=self.user)[0]

        # URL de la vista que queremos probar
        root_url = "http://localhost:8000"
        self.url = root_url + '/core/user/view'
        print("Testing this url:",self.url)

        # Inicializa el driver de Selenium
        options = Options()
        options.headless = True
        self.selenium = webdriver.Chrome(
            executable_path = './drivers/chromedriver_win32.zip',
            options=options)
        
        if os.environ.get('GITHUB_WORKFLOW'):
            self.selenium = webdriver.Chrome('./drivers/chromedriver_linux64.zip',
            options=options)
            
        super().setUp()

    def tearDown(self):
        self.selenium.quit()
        super().tearDown()

    # def test_user_view_auth_required(self):
    #     # Hace una solicitud sin token de autenticación
    #     self.selenium.get(self.url)
        
    #     # Verifica que se recibe una respuesta de error de autenticación
    #     # self.assertIn("Unauthorized", self.selenium.page_source)

    #     # Verifica que se recibe una respuesta éxitosa de autenticación
    #     self.assertIn("HTTP 200 OK", self.selenium.page_source)

    # def test_user_view_json_required(self):
    #      # Hace una solicitud con un token de autenticación pero sin cuerpo en JSON
    #     headers = {'Authorization': f'Token {self.token}', 'Content-Type': 'application/json'}
    #     self.selenium.get(self.url)

    #     # Agrega la cookie de autenticación a la sesión de Selenium
    #     # self.selenium.add_cookie({'name': 'Authorization', 'value': f'Token {self.token}'})

    #     # Actualiza la página para que se incluya la cookie de autenticación
    #     # self.selenium.refresh()

    #     # Verifica que se recibe una respuesta de error de formato
    #     # self.assertIn("JSON", self.selenium.page_source)

    #     # Verifica que se recibe una respuesta éxitosa de autenticación
    #     self.assertIn("HTTP 200 OK", self.selenium.page_source)

    def test_user_view_success(self):
        # Crea un cuerpo en JSON válido
        data = {
            'email': self.email,
            'password': self.password
        }
        json_data = json.dumps(data)

        headers = {'Authorization': f'Token {self.token}', 'Content-Type': 'application/json'}

        # Agrega la cookie de autenticación a la sesión de Selenium
        # self.selenium.add_cookie({'name': 'Authorization', 'value': f'Token {self.token}'})

        # Actualiza la página para que se incluya la cookie de autenticación
        # self.selenium.refresh()

        # Hace una solicitud GET con un token de autenticación y un cuerpo en JSON válido
        print("Testing this url2:",self.url)
        self.selenium.get(self.url)
        time.sleep(5)

        # Verifica que se recibe una respuesta de éxito
        self.assertIn("HTTP 200 OK", self.selenium.page_source)

    def test4(self):
        self.assertEqual(123, 123)