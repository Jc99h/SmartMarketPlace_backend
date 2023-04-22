"""SmartMarketPlace_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from core import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('core/user/create',
        views.CreateUserView.as_view(), name='create_user'),
    # path('core/user/token',
    #     views.CreateTokenView.as_view(), name='token'),
    path('core/user/view', 
         views.SelectAllUsers.as_view(), name="show_all_users"),
    path('core/user/client/update/<int:pk>/',
        views.admin_get_put_worker, name="update_get_workers"),
        path('mande/user/login',
    views.login_user, name="login_user"),
]
