import React from 'react';
import './style.css';

const ShowRating = (props) => {
    const value = props['value'].toFixed(1);
    let style = 'show-rating';

    if (value >= 0 && value < 3) {
        style += ' rate03'
    } else if (value >= 3 && value < 5) {
        style += ' rate35'
    } else if (value >= 5 && value < 7) {
        style += ' rate57'
    } else {
        style += ' rateHigh'
    }

    return(
        <div className={style}>
           {value}
        </div>
    )
}

export default ShowRating;