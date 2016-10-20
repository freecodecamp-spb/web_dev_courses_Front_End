import React, { Component } from 'react';

import './search-bar.css';

export class SearchBar extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      query: ''
    };
    
    this.onChange = this.onChange.bind(this);
  }
  
  onChange(e) {
    let query = e.target.value;
    
    this.setState({
      query: query
    });
    
    this.props.changeQueryHandler(query);
  }
  
  render() {

    return (
      <div className="SearchBar">
        <input
          type="text"
          value={this.state.query}
          onChange={this.onChange}
          placeholder="Введите текст поиска"
        />
      </div>
    );
  }
}
