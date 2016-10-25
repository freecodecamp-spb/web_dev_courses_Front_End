import React, { Component } from 'react';
import './course-card.css';

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
      return this.getEditLayout(this.props.card);
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
  
  getEditLayout(card) {
    let tags = card.tags.map(tag => {
      return (
        <li
          key={Math.random()}>
          {tag}
        </li>
      )
    });
    
    return (
      <form className="CourseCard" onSubmit={(e) => { e.preventDefault() } }>
        
        <button
          className="btn btn default"
          onClick={this.setViewMode}>
          View
        </button>
        
        <div className="header">
          <input value={card.title}/>
        </div>
        
        <div className="author">
          <input value={card.author}/>
        </div>
        
        <div className="image">
          <input value={card.image}/>
        </div>
        
        
        <textarea
          className="description"
          value={card.description}
        />
        
        <ul className="tags">
          {tags}
        </ul>
        
        <hr/>
        
        <ul className="links">
          <li>
            <input value={card.link}/>
          </li>
        </ul>
      
      </form>
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
