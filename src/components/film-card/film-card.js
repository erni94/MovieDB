import React, {useContext} from 'react';
import './style.css';
import { format, parseISO } from 'date-fns';
import RateSelector from "../rate-selector/rate-selector";
import ShowRating from "../show-rating/show-rating";
import Genres from "../genres/genres";

function cutText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }

    const shortened = text.substring(0, maxLength);

    const lastSpaceIndex = shortened.lastIndexOf(' ');
    if (lastSpaceIndex > 0) {
        return shortened.substring(0, lastSpaceIndex) + '...';
    }

    return shortened + '...';
}


function FilmCard(props){

    const filmObject = props.filmObject;

    let releaseDate = 'Not found';
    if (filmObject.release_date) {
        releaseDate = format(parseISO(filmObject.release_date), 'MMMM d, yyyy');
    }

    const textShortened = cutText(filmObject.overview, 150);

    const genresList = useContext(Genres.Context)


    const GenreComponent = ({ genre }) => {
        return (
            <div className="genre">{genre}</div>
        );
    };
    const foundGenres = genresList.filter(genre => filmObject.genre_ids.includes(genre.id));
    return (
        <div className="film-card">
            <div className="poster">
                <img className="main-image" src={`https://image.tmdb.org/t/p/w500/${filmObject.poster_path}`} alt="poster" />
            </div>
            <div className="info">
                    <h1 className="title">{filmObject.title}</h1>
                    <div className="release-date">{releaseDate}</div>
                    <div className="genres">
                        {foundGenres.map(genre => (
                            <GenreComponent key={genre.id} genre={genre.name} />
                        ))}
                    </div>
                    <p className="synopsis">{textShortened}</p>
                    <RateSelector
                        id={filmObject.id}
                        value={filmObject.rating || parseFloat(localStorage.getItem(filmObject.id))}
                    />
                    <ShowRating
                            value = {filmObject.vote_average}
                    />
            </div>
        </div>
    );
}

export default FilmCard;
