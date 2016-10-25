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
          <input
            className="form-control"
            value={tag}
          />
        </li>
      )
    });
    
    return (
      <form
        className="form CourseCard"
        onSubmit={(e) => { e.preventDefault() } }
      >
  
        <div className="controls">
          <button
            className="btn btn-default"
            onClick={this.setViewMode}>
            View
          </button>
        </div>
        
        <div className="header form-item">
          <div className="input-group">
            <label htmlFor="title" className="input-group-addon">title</label>
            <input
              id="title"
              className="form-control"
              value={card.title}/>
          </div>
        
        </div>
        
        <div className="author form-item">
          <div className="input-group">
            <label htmlFor="author" className="input-group-addon">author</label>
            <input
              id="author"
              className="form-control"
              value={card.author}/>
          </div>
        </div>
        
        <div className="image form-item">
          <div className="input-group">
            <label htmlFor="image" className="input-group-addon">image</label>
            <input
              id="image"
              className="form-control"
              value={card.image}/>
          </div>
        </div>
        
        <div className="description form-item">
  
          <div className="input-group">
            <label htmlFor="description" className="input-group-addon">description</label>
            <textarea
              id="description"
              className="form-control"
              rows="10"
              value={card.description}
            />
          </div>
        </div>
        
        <div className="links form-item">
          <div className="input-group">
            <label htmlFor="link" className="input-group-addon">link</label>
            <input
              className="form-control"
              value={card.link}
            />
          </div>
        </div>
  
        <div className="tags-wrapper">
          <div>tags:</div>
          <ul className="tags">
            {tags}
          </ul>
        </div>
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
