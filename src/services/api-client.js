export default class APIClient {
    apiKey = 'b4f44cfad86e3e0257ec8df07ed179f6';
    baseURL = 'https://api.themoviedb.org/3';
    bearer = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNGY0NGNmYWQ4NmUzZTAyNTdlYzhkZjA3ZWQxNzlmNiIsInN1YiI6IjY1NTBiMGQ2ZDRmZTA0MDBjNDFmMjc1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-AX0W0GylIgKco8vU3YtpUwrzRTt6_CTNgzImjDE_bY';

    async searchMovies(query, page = 1) {
        const searchTerm = encodeURIComponent(query);
        const apiUrlSearch = `${this.baseURL}/search/movie?api_key=${this.apiKey}&query=${searchTerm}&page=${page}`;

        const response = await fetch(apiUrlSearch);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    }

    async createGuestSession() {
        const response = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: this.bearer
            }
        });
        const jsonResponse = await response.json();
        if (!jsonResponse.success) {
            throw new Error(`HTTP error! Status: ${jsonResponse.status_message}`);
        }
        localStorage.setItem('guestSessionId', jsonResponse.guest_session_id);
    }

    async getRatedFilms(sessionID, page = 1) {
        const response = await fetch(`https://api.themoviedb.org/3/guest_session/${sessionID}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc'`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: this.bearer
            }
        })
        return await response.json();
    }
}
