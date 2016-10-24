import React, { Component } from 'react';
import { Link } from 'react-router';

import './course-thumb.css';

export class CourseThumb extends Component {
  
  render() {
    let card = this.props.card;
    
    let tags = card.tags.map(tag => {
      return (
        <li key={Math.random()}>{tag}</li>
      )
    });
    
    return (
      <div className="CourseThumb">
        
        <div className="header">
          <h2>{card.title}</h2>
        </div>
        
        <div className="author">{card.author}</div>
  
        <img src={card.image} alt={card.title} className="image"/>
        
        <div className="description">{card.description}</div>
        
        <ul className="tags">
          {tags}
        </ul>
  
        <hr/>
  
        <ul className="links">
          <li><Link to={'/courses/' + this.props.id}>Карточка курса</Link></li>
          <li><a href={card.link} target="_blank">Ссылка на сайт</a></li>
        </ul>
        
      </div>
    );
  }
}
