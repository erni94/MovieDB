import React, { useState } from 'react';
import { Rate } from 'antd';
import APIClient from "../../services/api-client";

const apiClient = new APIClient();

const RateChange = (value, movieID) => {
    apiClient.setRating(localStorage.getItem('guestSessionId'), movieID, value);
    localStorage.setItem(movieID, value);
}

const RateSelector = (props) => {
    const { value } = props;
    const [rateValue, setRateValue] = useState(value);
    return (
        <Rate
            defaultValue={0}
            value={rateValue}
            count={10}
            onChange={(value)=>{setRateValue(value); RateChange(value, props.id)}}
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
