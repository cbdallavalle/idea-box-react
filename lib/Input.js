import React, { Component } from 'react';
import '../styles/Input.css';

export default class Input extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({input: e.target.value})
  }

  render() {
    return (
      <div className='Input'>
        <label htmlFor={this.props.type}></label>
        <input 
          type="text" 
          id={this.props.type} 
          placeholder={this.props.type} 
          onChange={this.handleChange}
        />
      </div>
    )
  }
};