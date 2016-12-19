import React, { Component } from 'react';
import { Link } from 'react-router';
import './course-thumb.css';

export class CourseThumb extends Component {
  
  render() {
    let card = this.props.card;
    
    let tags = card.tags.map(tag => {
      return (
        <li
          className="list-group-item coursethumb__body-tag"
          key={Math.random()}>{tag}</li>
      )
    });
    
    return (
      <div className="CourseThumb panel panel-default coursethumb__body">
        
        <div className="coursethumb__header">
          <div className="coursethumb__header-title">
            <Link to={'/courses/' + this.props.id}>
              {card.title}
            </Link>
          </div>
          <div className="coursethumb__header-author">{card.author}</div>
        </div>
        
        <div className="panel-body coursethumb__body">
          <div className="row">
            
            <div className="col-md-4">
              <img
                className="image img-thumbnail coursethumb__body-image"
                src={card.image} alt={card.title}/>
            </div>
            
            <div className="col-md-8">
              <div className="description coursethumb__body-desc">{card.description}</div>
              <ul className="tags list-group coursethumb__body-tags">
                {tags}
              </ul>
            </div>
          
          </div>
          
          <div className="links">
            <a href={card.link} target="_blank">{card.link}</a>
          </div>
        </div>
      
      </div>
    );
  }
}
