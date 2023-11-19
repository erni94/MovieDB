export default class APIClient {
    apiKey = 'b4f44cfad86e3e0257ec8df07ed179f6';
    baseURL = 'https://api.themoviedb.org/3';

    async searchMovies(query, page = 1) {
        const searchTerm = encodeURIComponent(query);
        const apiUrlSearch = `${this.baseURL}/search/movie?api_key=${this.apiKey}&query=${searchTerm}&page=${page}`;

        const response = await fetch(apiUrlSearch);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();

    }
}
