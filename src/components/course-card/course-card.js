import React, { Component } from 'react';
import './course-card.css';

import { CourseCardForm } from '../course-card-form';

export class CourseCard extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      isEditMode: false
    };
    
    this.setEditMode = this.setEditMode.bind(this);
    this.setViewMode = this.setViewMode.bind(this);
  }
  
  render() {
    if (this.state.isEditMode) {
      return (
        <CourseCardForm
          onSave={this.props.onSave}
          setViewMode={this.setViewMode}
          id={this.props.id}
          card={this.props.card}
        />
      );
    } else {
      return this.getViewLayout(this.props.card);
    }
  }
  
  getViewLayout(card) {
    let tags = card.tags.map(tag => {
      return (
        <li
          className="list-group-item"
          key={Math.random()}>
          {tag}
        </li>
      )
    });
    
    return (
      <div className="CourseCard">
        
        <div className="controls">
          <button
            className="btn btn-default"
            onClick={this.setEditMode}>
            Edit
          </button>
        </div>
        
        
        <div className="panel panel-default">
          <div className="header panel-heading">
            <h2>{card.title}</h2>
          </div>
          
          <div className="panel-body">
            
            <div className="author"><h4>{card.author}</h4></div>
            
            <div className="row">
              
              <div className="col-md-5">
                <img
                  className="image thumbnail"
                  src={card.image} alt={card.title}
                />
              </div>
              
              <div className="col-md-5">
                <div className="description">{card.description}</div>
                
                <ul className="tags list-group">
                  {tags}
                </ul>
                
                <div className="links">
                  <a href={card.link} target="_blank">{card.link}</a>
                </div>
              
              </div>
            
            </div>
          </div>
        </div>
      </div>
    );
  }

  setEditMode(e) {
    e.preventDefault();
    
    this.setState({
      isEditMode: true
    });
  }
  
  setViewMode(e) {
    e.preventDefault();
    
    this.setState({
      isEditMode: false
    });
  }
}
