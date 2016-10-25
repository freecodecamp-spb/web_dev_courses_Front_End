import React, { Component } from 'react';

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
        <li key={Math.random()}>{tag}</li>
      )
    });
    
    return (
      <div className="CourseCard">
        
        <button onClick={this.setEditMode}>Edit</button>
        
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
          <li><a href={card.link} target="_blank">Ссылка на сайт</a></li>
        </ul>
      
      </div>
    );
  }
  
  getEditLayout(card) {
    let tags = card.tags.map(tag => {
      return (
        <li key={Math.random()}>{tag}</li>
      )
    });
    
    return (
      <form className="CourseCard" onSubmit={(e)=> { e.preventDefault() } }>
  
        <button onClick={this.setViewMode}>View</button>
        
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
