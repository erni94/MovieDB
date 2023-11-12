export default class APIClient {
    apiKey = 'b4f44cfad86e3e0257ec8df07ed179f6';
    baseURL = 'https://api.themoviedb.org/3';

    async searchMovies(query) {
        const searchTerm = encodeURIComponent(query);
        const apiUrlSearch = `${this.baseURL}/search/movie?api_key=${this.apiKey}&query=${searchTerm}`;

        const response = await fetch(apiUrlSearch);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.results;
    }
}
