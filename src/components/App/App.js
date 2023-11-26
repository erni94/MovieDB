import React from 'react';
import RatedFilms from "../rated-films/rated-films";
import FilmsList from "../films-list/films-list";
import { Tabs } from 'antd';
import Genres from "../genres/genres";

import 'typeface-inter';
import './style.css';



class App extends React.Component {

    state={
        activeTab: 'Search '
    }

    items = [
        {
            key: 'Search',
            label: 'Search',
            children: <FilmsList />
        },
        {
            key: 'Rated',
            label: 'Rated',
            children: <RatedFilms />,
        }
    ]

    onChange = (key) => {
        this.setState({ activeTab: key });
    }


    render() {
        return (
            <Genres.Provider>
            <Tabs defaultActiveKey="Search" items={this.items} onChange={this.onChange} destroyInactiveTabPane={true} centered={true}/>
            </Genres.Provider>
        )

    }
}

export default App;
