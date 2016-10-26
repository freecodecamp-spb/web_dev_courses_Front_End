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
    this.onFormChange = this.onFormChange.bind(this);
    this.save = this.save.bind(this);
  }
  
  render() {
    if (this.state.isEditMode) {
      return this.getEditLayout();
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
  
  getEditLayout() {
    if (!this.state.card) {
      return (
        <div>Loading...</div>
      );
    }
    
    let tags = this.state.card.tags.map(tag => {
      return (
        <li
          key={Math.random()}>
          <input
            className="form-control"
            onChange={this.onFormChange}
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
  
          <button
            className="btn btn-primary save"
            onClick={this.save}>
            Save
          </button>
        </div>
        
        <div className="header form-item">
          <div className="input-group">
            <label htmlFor="title" className="input-group-addon">title</label>
            <input
              id="title"
              name="title"
              className="form-control"
              onChange={this.onFormChange}
              value={this.state.card.title}/>
          </div>
        
        </div>
        
        <div className="author form-item">
          <div className="input-group">
            <label htmlFor="author" className="input-group-addon">author</label>
            <input
              id="author"
              name="author"
              className="form-control"
              onChange={this.onFormChange}
              value={this.state.card.author}/>
          </div>
        </div>
        
        <div className="image form-item">
          <div className="input-group">
            <label htmlFor="image" className="input-group-addon">image</label>
            <input
              id="image"
              name="image"
              className="form-control"
              onChange={this.onFormChange}
              value={this.state.card.image}/>
          </div>
        </div>
        
        <div className="description form-item">
          <div className="input-group">
            <label htmlFor="description" className="input-group-addon">description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              rows="10"
              onChange={this.onFormChange}
              value={this.state.card.description}
            />
          </div>
        </div>
        
        <div className="links form-item">
          <div className="input-group">
            <label htmlFor="link" className="input-group-addon">link</label>
            <input
              id="link"
              name="link"
              className="form-control"
              onChange={this.onFormChange}
              value={this.state.card.link}
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
  
  onFormChange(event) {
    let cardEdited = {};
    cardEdited[event.target.name] = event.target.value;
  
    this.setState((prevState, props) => ({
      card: Object.assign({}, prevState.card, cardEdited)
    }));
  }
  
  setEditMode(e) {
    e.preventDefault();
    
    this.setState({
      isEditMode: true,
      card: this.props.card
    });
  }
  
  setViewMode(e) {
    e.preventDefault();
    
    this.setState({
      isEditMode: false
    });
  }
  
  save() {
    let request =  {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(this.state.card)
    };
    
  
    fetch(`/api/courses/${this.props.id}`, request)
    .then((res) => res.json())
    .then((data) => console.log("data: ", data))
  }
}
