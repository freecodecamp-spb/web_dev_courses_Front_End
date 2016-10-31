import React, { Component, PropTypes } from 'react';
import './course-card-form.css';

class CourseCardForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      // TODO: refactor
      card: Object.assign({}, this.props.card)
    };
    
    this.onFormChange = this.onFormChange.bind(this);
    this.save = this.save.bind(this);
  }
  
  render() {
    return (
      <form
        className="form CourseCardFrom"
        onSubmit={(e) => { e.preventDefault() } }
      >
        
        <div className="controls">
          <button
            className="btn btn-default"
            onClick={this.props.setViewMode}>
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

  save() {
    this.props.onSave(this.state.card)
  }
}

CourseCardForm.propTypes = {
  onSave: PropTypes.func,
  setViewMode: PropTypes.func,
  card: PropTypes.object
};

export { CourseCardForm };
