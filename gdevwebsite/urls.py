from django.urls import include, path
from frontend import urls as frontend_urls
from api import urls as api_urls
urlpatterns = [
    path("", include(frontend_urls)),
    path("api/", include(api_urls)),
]
