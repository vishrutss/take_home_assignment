from django.urls import path
from .views import search_movies, get_trailer

urlpatterns = [
    path('search/', search_movies, name='search_movies'),
    path('trailer/<int:movie_id>/', get_trailer, name='get_trailer'),
]
