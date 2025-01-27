"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
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
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.views.generic import TemplateView
from rest_framework_jwt.views import obtain_jwt_token

schema_view = get_schema_view(
    openapi.Info(
        title="teamfinderr",
        default_version="v1",
        description="teamfinderr API",
        # terms_of_service= "terms",
        # contact =openapi.Contact(email= "hello@example.com"),
        # license =openapi.License(name="BSD License"),
    ),
    public=True,
    # permission_classes = (permissions.AllowAny,),
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')), 
    path("api-auth/", include("rest_framework.urls")),
    path("api/v1/dj-rest-auth/", include("dj_rest_auth.urls")),
    path(
        "api/v1/dj-rest-auth/registration/", include("dj_rest_auth.registration.urls")
    ),
    path("api/v1/projects/", include("projects.urls")),
    path("api/v1/profiles/", include("profiles.urls")),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
      path('token-auth/', obtain_jwt_token),
]
