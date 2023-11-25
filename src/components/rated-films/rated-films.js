import React from 'react';
import FilmCard from "../film-card";
import { Spin, Alert } from 'antd';
import APIClient from "../../services/api-client";
import CustomPagination from "../pagination";

export default class RatedFilms extends React.Component {
    state = {
        filmObject: [],
        loading: true,
        error: null,
        currentPage: 1,
        totalPage: 0,
        isMounted: false,
    };

    apiClient = new APIClient();

    componentDidMount() {
        this.setState({ isMounted: true }, () => {
            this.getFilms();
        });

    }
    getFilms = () => {
        if (!navigator.onLine) {
            this.setState({ error: 'No internet connection.' });
            return;
        }
        this.setState({ loading: true });
        this.apiClient.getRatedFilms(localStorage.getItem('guestSessionId'), this.state.currentPage)
            .then (({ results, total_pages }) => {
                this.setState({ filmObject: results, loading: false, totalPage: total_pages });
            })
    }

    onChangePage = (page) => {
        this.setState({ currentPage: page });
        this.getFilms();
    }

    render() {
        const { filmObject, loading, error, currentPage, totalPage } = this.state;

        const renderFilmListOrSpinner =()=>{
            if (loading) {
                return <Spin size="large" />;
            } else {
                return filmObject.map((film) => (
                    <FilmCard key={film.id} filmObject={film} />
                ))
            }
        }

        if (error) {
            return <Alert message="Error" description={error} type="error" />;
        }

        return (<>
                <div className="film-cards">
                    {renderFilmListOrSpinner()}
                </div>
                <CustomPagination
                    currentPage={currentPage}
                    totalPage={totalPage}
                    onChangePage={this.onChangePage}
                />
            </>
        )

    }

}