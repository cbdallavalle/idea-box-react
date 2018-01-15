import React from 'react';
import Card from './Card';
import '../styles/CardContainer.css'

export default function CardContainer(props) {

  return (
    <div className='CardContainer'>
      <input type='Search'
             placeholder='Search'
             onChange={(e) => props.handleInputChange(e, 'search')}
      />
      { props.cardsToRender &&
        props.cardsToRender.map( (card, index) => {
          return(
            <Card key={index}
                  cardToRender={card}
                  handleVote={props.handleVote}
                  handleDelete={props.handleDelete}
                  handleEditedContent={props.handleEditedContent}
            />
          )
        })
      }
    </div>
  )
}