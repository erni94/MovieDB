import React from 'react';
import './style.css';
import { format, parseISO } from 'date-fns';
import RateSelector from "../rate-selector/rate-selector";
import ShowRating from "../show-rating/show-rating";

function cutText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }

    const shortened = text.substring(0, maxLength);
    // Проверяем, чтобы не обрезать посреди слова
    const lastSpaceIndex = shortened.lastIndexOf(' ');
    if (lastSpaceIndex > 0) {
        return shortened.substring(0, lastSpaceIndex) + '...';
    }

    // Если текст состоит из одного длинного слова, просто обрезаем до maxLength
    return shortened + '...';
}


function FilmCard(props){

    const filmObject = props.filmObject;
    const releaseDate = format(parseISO(filmObject.release_date), 'MMMM d, yyyy');
    const textShortened = cutText(filmObject.overview, 150);



    return (
        <div className="film-card">
            <div className="poster">
                <img className="main-image" src={`https://image.tmdb.org/t/p/w500/${filmObject.poster_path}`} alt="poster" />
            </div>
            <div className="info">
                    <h1 className="title">{filmObject.title}</h1>
                    <div className="release-date">{releaseDate}</div>
                    <div className="genres">
                        <div className="genre">Action</div>
                        <div className="genre">Drama</div>
                    </div>
                    <p className="synopsis">{textShortened}</p>
                    <RateSelector id={filmObject.id}/>
                    <ShowRating
                        value={filmObject.vote_average}
                    />
            </div>
        </div>
    );
}

export default FilmCard;
