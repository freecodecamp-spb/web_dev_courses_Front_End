import React, { Component } from 'react';

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
  
        <a href={card.link} target="_blank">Открыть в новом окне</a>
        
      </div>
    );
  }
}
