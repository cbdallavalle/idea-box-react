import React, { Component } from 'react';
import '../styles/Card.css';

export default class Card extends Component {

  render() {
    const { title, body, quality } = this.props.cardToRender;

    return (
      <article>
        <h2 contentEditable="true"
            onBlur={ (e) => {
              let editedText = e.currentTarget.textContent
              this.props.handleEditedContent(this, editedText, 'h2')}} >
          {title}
        </h2>
        <p contentEditable="true"
            onBlur={ (e) => {
              let editedText = e.currentTarget.textContent
              this.props.handleEditedContent(this, editedText, 'p')}} >
          {body}
        </p>
        <button className='card-button' 
                id='upvote'
                onClick={ () => this.props.handleVote(this, 'upvote') }>
        </button>
        <button className='card-button' 
                id='downvote'
                onClick= { () => this.props.handleVote(this, 'downvote') }>
        </button>
        <button className='card-button' 
                id='delete'
                onClick={ () => this.props.handleDelete(this) }>
        </button>
        <ul>
          <li>quality: </li>
          <li>{quality}</li>
        </ul>
        <hr />
      </article>
    )
  }
}