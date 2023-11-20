import React from 'react';
import './style.css';
import APIClient from "../../services/api-client";
import FilmCard from "../film-card";
import { Spin, Alert } from 'antd';
import SearchBar from "../search-bar";
import CustomPagination from "../pagination";

class App extends React.Component {


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
        this.setState({ isMounted: true }, () => {
            this.getFilms('avengers', this.state.currentPage);
        });
    }

    getFilms = (text, page) => {
        /*const { searchTerm } = this.state;*/
       /* const searchQuery = searchTerm || text; */// Use searchTerm if available, else use default text

        if (!navigator.onLine) {
            this.setState({ error: 'No internet connection.' });
            return;
        }
        this.setState({ loading: true });
        this.apiClient.searchMovies(text, page)
            .then(({ results, total_pages }) => {
                console.log(total_pages)
                this.setState({ filmObject: results, loading: false, totalPage: total_pages, searchTerm: text });
            })
            .catch(() => {
                this.setState({ error: 'Failed to load films.', loading: false });
            });
    }

    onChangePage = (page) => {
        this.setState({ currentPage: page });
        this.getFilms(this.state.searchTerm, page); // Update films based on the selected page and search term from state
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

export default App;
