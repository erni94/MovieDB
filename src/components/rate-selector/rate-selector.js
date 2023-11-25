import React from 'react';
import { Rate } from 'antd';
import APIClient from "../../services/api-client";

const apiClient = new APIClient();


const RateChange = (value, movieID) => {
    console.log(value)
    apiClient.setRating(localStorage.getItem('guestSessionId'), movieID, value);
}
const RateSelector = (props) => {
    const { value } = props;
    return (
        <Rate
            defaultValue={0}
            value={value}
            count={10}
            onChange={(value)=>RateChange(value, props.id)}
            style={
                {
                    fontSize: 16,
                    position: 'absolute',
                    left: 20,
                    bottom: 25
                }
            }
        />
    );
}

export default RateSelector;