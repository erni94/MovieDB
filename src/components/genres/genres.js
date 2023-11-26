import React, { createContext, Component } from 'react';
import APIClient from "../../services/api-client";

const apiClient = new APIClient();

const GenresContext = createContext();

class GenresProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            genres: [],
        };
    }

    async componentDidMount() {
        try {
            const genres = await apiClient.getGenres();
            this.setState({ genres });
        } catch (error) {
            // Handle error if any
            console.error("Error fetching genres:", error);
        }
    }

    render() {
        const { children } = this.props;
        const { genres } = this.state;

        return (
            <GenresContext.Provider value={genres}>
                {children}
            </GenresContext.Provider>
        );
    }
}

const Genres = {
    Provider: GenresProvider,
    Context: GenresContext,
};

export default Genres;
