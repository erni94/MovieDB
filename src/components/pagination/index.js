import React from 'react';
import { Pagination as AntPagination } from 'antd';

export default class CustomPagination extends React.Component {
    state = {
        currentPage: this.props.currentPage || 1, // Инициализация currentPage из props или по умолчанию
    };

    onChange = (page) => {
        this.setState({
            currentPage: page,
        });
        this.props.onChangePage(page);
    }

    render() {
        return (
            <AntPagination
                defaultCurrent={this.state.currentPage} // Использование this.state.currentPage
                total={this.props.totalPage} // Использование this.props.totalPage
                onChange={this.onChange}
            />
        );
    }
}
