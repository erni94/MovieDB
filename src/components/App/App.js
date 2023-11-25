import React from 'react';
import './style.css';
import RatedFilms from "../rated-films/rated-films";
import FilmsList from "../films-list/films-list";
import { Tabs } from 'antd';


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
            <Tabs defaultActiveKey="Search" items={this.items} onChange={this.onChange} />
        )

    }
}

export default App;
