import requests
from django.http import JsonResponse
from django.conf import settings

def search_movies(request):
    query = request.GET.get('query')
    url = f"https://api.themoviedb.org/3/search/movie?api_key={settings.TMDB_API_KEY}&query={query}"
    response = requests.get(url)
    return JsonResponse(response.json())

def get_trailer(request, movie_id):
    url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q={movie_id}+trailer&key={settings.YOUTUBE_API_KEY}"
    response = requests.get(url)
    return JsonResponse(response.json())