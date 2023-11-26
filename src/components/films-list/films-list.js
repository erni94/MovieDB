import React from 'react';
import './style.css';
import APIClient from "../../services/api-client";
import FilmCard from "../film-card";
import { Spin, Alert } from 'antd';
import SearchBar from "../search-bar";
import CustomPagination from "../pagination";

class FilmsList extends React.Component {


    apiClient = new APIClient();

    state = {
        filmObject: [],
        loading: true,
        error: null,
        currentPage: 1,
        totalPage: 0,
        searchTerm: '',
        isMounted: false,
    };



    componentDidMount() {
        if(!(localStorage.getItem('guestSessionId'))) {
            this.apiClient.createGuestSession();
        }
        this.setState({ isMounted: true }, () => {
            this.getPopularFilms(this.state.currentPage);
        });
    }

    getFilms = (text, page) => {

        if (!navigator.onLine) {
            this.setState({ error: 'No internet connection.' });
            return;
        }
        this.setState({ loading: true });
        this.apiClient.searchMovies(text, page)
            .then(({ results, total_pages }) => {
                this.setState({ filmObject: results, loading: false, totalPage: total_pages, searchTerm: text });
            })
            .catch(() => {
                this.setState({ error: 'Failed to load films.', loading: false });
            });
    }

    getPopularFilms = (page) => {
        this.apiClient.popularMovies(page)
            .then(({ results, total_pages }) => {
                this.setState({ filmObject: results, loading: false, totalPage: total_pages });
            })
            .catch(() => {
                this.setState({ error: 'Failed to load films.', loading: false });
            });
    }

    onChangePage = (page) => {
        this.setState({ currentPage: page });
        if (this.state.searchTerm) {
            this.getFilms(this.state.searchTerm, page);
        }
        else {
            this.getPopularFilms(page);
        }
    }




    render() {
        const { filmObject, loading, error, currentPage, totalPage } = this.state;


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
                <CustomPagination
                    currentPage={currentPage}
                    totalPage={totalPage}
                    onChangePage={this.onChangePage}
                />
            </>
        );
    }
}

export default FilmsList;
