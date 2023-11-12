import React from 'react';
import './style.css';

function FilmCard(props) {

    return (
        <div className="film-card">
            <div className="movie-poster">
                <div className="poster">
                    <img className="main-image" src="path_to_image" alt="main character"/>
                </div>
                <div className="info">
                    <h1 className="title">The Way Back</h1>
                    <div className="release-date">March 5, 2020</div>
                    <div className="genres">
                        <div className="genre">Action</div>
                        <div className="genre">Drama</div>
                    </div>
                    <p className="synopsis">A former basketball all-star, who has lost his wife and family foundation in
                        a struggle with addiction attempts to regain his</p>
                </div>
            </div>
        </div>
    );
}

export default FilmCard;
