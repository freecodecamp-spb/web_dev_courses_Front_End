import React, {
  Component,
  PropTypes
} from 'react';

import './search-bar.css';

export class SearchBar extends Component {
  static propTypes = {
    changeQueryHandler: PropTypes.func
  };
  
  constructor(props) {
    super(props);
    
    this.state = {
      query: ''
    };
    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onChange(e) {
    let query = e.target.value;
    
    this.setState({
      query: query
    });
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.changeQueryHandler(this.state.query);
  }
  
  render() {

    return (
      <div className="SearchBar">
        <form onSubmit={this.onSubmit} className="input-group">
          <input
            className="form-control"
            value={this.state.query}
            onChange={this.onChange}
            placeholder="Введите текст поиска"
          />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-default">Найти!</button>
          </span>
        </form>
      </div>
    );
  }
}
