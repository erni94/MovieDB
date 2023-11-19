import React from 'react';
import './style.css';
import APIClient from "../../services/api-client";
import FilmCard from "../film-card";
import { Spin, Alert } from 'antd';
import SearchBar from "../search-bar";

class App extends React.Component {

    constructor() {
        super();
        this.apiClient = new APIClient();
        this.state = {
            filmObject: [],
            loading: true,
            error: null,
        };
        this.getFilms('avengers');
    }



    getFilms = (text) => {
        if (!navigator.onLine) {
            this.setState({ error: 'No internet connection.' });
            return;
        }
        this.apiClient.searchMovies(text)
            .then(({ results }) => {
                this.setState({ filmObject: results, loading: false });
            })
            .catch((error) => {
                this.setState({ error: 'Failed to load films.' });
            });
    }


    render() {
        const {filmObject, loading, error} = this.state;


        const renderFilmListOrSpinner = () => {
            if (loading) {
                return <Spin size="large" />;
            } else {
                if (filmObject.length === 0) {
                    return <h2>No films found.</h2>;
                } else {
                    return filmObject.map((film) => (
                        <FilmCard key={film.id} filmObject={film} />
                    ));
                }
            }
        };

        if (error) {
            return <Alert message="Error" description={error} type="error" />;
        }

        return (<>
            <SearchBar getFilms={this.getFilms}/>
            <div className="film-cards">
                {renderFilmListOrSpinner()}
            </div>
            </>
        );
    }
}

export default App;
