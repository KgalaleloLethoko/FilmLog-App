using System.Text.Json;

namespace FilmLogBackEnd.FilmLogServices
{
    public class MovieService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public MovieService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<JsonElement> SearchMoviesByTitle(string title)
        {
            var apiKey = _configuration["OMDb:ApiKey"];
            var baseUrl = _configuration["OMDb:BaseUrl"];

            var response = await _httpClient.GetAsync($"{baseUrl}?apikey={apiKey}&s={title}");
            var json = await response.Content.ReadAsStringAsync();

            return JsonSerializer.Deserialize<JsonElement>(json);
        }

        public async Task<JsonElement> GetMovieDetailsByTitle(string title)
        {
            var apiKey = _configuration["OMDb:ApiKey"];
            var baseUrl = _configuration["OMDb:BaseUrl"];

            var response = await _httpClient.GetAsync($"{baseUrl}?apikey={apiKey}&t={title}");
            var json = await response.Content.ReadAsStringAsync();

            return JsonSerializer.Deserialize<JsonElement>(json);
        }
    }
}