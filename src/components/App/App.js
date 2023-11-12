import React from 'react';
import './style.css';
import APIClient from "../../services/api-client";
import FilmCard from "../film-card";

const apiClient = new APIClient();

const filmObject = await apiClient.searchMovies('return');

console.log(filmObject);
function App() {
    return (
        <div className="film-card">
            <FilmCard />
        </div>
    );
}

export default App;
