import React from 'react';
import { Input } from 'antd';
import './style.css';
import debounce from 'lodash.debounce';


 export default class SearchBar extends React.Component {

     state = {
         value: ""
     }



     onChange = (e) => {
         this.setState({
             value: e.target.value
         });

         debounce(() => {
             this.props.getFilms(e.target.value);
         }, 500)();
     }

     render() {
         return(
            <Input className={'search-bar'} placeholder="Type to search..." value={this.state.value} onChange={this.onChange}/>
         )
     }
}

