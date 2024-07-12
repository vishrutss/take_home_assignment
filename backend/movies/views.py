import requests
from django.http import JsonResponse
from googleapiclient.discovery import build
from django.conf import settings

def search_movies(request):
    query = request.GET.get('query')
    url = f"https://api.themoviedb.org/3/search/movie?api_key={settings.TMDB_API_KEY}&query={query}"
    response = requests.get(url)
    return JsonResponse(response.json())

def get_trailer(request, movie_id):
    tmdb_api_key = settings.TMDB_API_KEY
    tmdb_url = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={tmdb_api_key}'
    tmdb_response = requests.get(tmdb_url)
    if tmdb_response.status_code == 200:
        movie_data = tmdb_response.json()
        movie_title = movie_data['title']
    else:
        return JsonResponse({'error': 'Failed to fetch movie details'}, status=tmdb_response.status_code)

    youtube_api_key = settings.YOUTUBE_API_KEY
    youtube = build('youtube', 'v3', developerKey=youtube_api_key)
    search_response = youtube.search().list(
        q=f"{movie_title} trailer",
        part='id',
        maxResults=1,
        type='video'
    ).execute()
    
    trailer_id = search_response['items'][0]['id']['videoId']
    url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q={trailer_id}+trailer&key={youtube_api_key}"
    response = requests.get(url)
    return JsonResponse(response.json())