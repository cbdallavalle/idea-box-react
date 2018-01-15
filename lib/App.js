import React, { Component } from 'react';
import Welcome from './Welcome';
import CardContainer from './CardContainer';
import '../styles/App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      body: '',
      search: '',
      totalCards: [],
      cardsMatchSearch: [],
    }
    this.storeNewCard = this.storeNewCard.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditedContent = this.handleEditedContent.bind(this);
  }

  checkLocalStorage() {
    let cardsInStorage = [];

    for(let i = 0; i < localStorage.length; i++) {
      let card = JSON.parse(localStorage.getItem(localStorage.key(i)));
      cardsInStorage.push(card);
      this.setState( {
        totalCards: cardsInStorage
      } )
    }
  }

  handleInputChange(e, input) {
    if(input === 'title') {
      this.setState( { 
        title: e.target.value,
      } );
    } else if (input === 'body') {
      this.setState( {
        body: e.target.value
      } );
    } else {
      this.searchCards(e);
    }
  }

  handleEditedContent(card, editedText, target) {
    let cardKey = card.props.cardToRender.key;
    let parsedCard = JSON.parse(localStorage.getItem(cardKey));
    let totalCards = this.findCardInState(cardKey, parsedCard);
    if(target === 'h2') {
      parsedCard.title = editedText;
    } else {
      parsedCard.body = editedText
    }
    this.storeInLocalStorage(cardKey, parsedCard);
  }

  searchCards(e) {
    let searchFrag = e.target.value.toLowerCase();
    let cardsMatchSearch = [];
    this.state.totalCards.forEach( card => {
      if(card['title'].toLowerCase().includes(searchFrag) 
        || card['body'].toLowerCase().includes(searchFrag)) {
        cardsMatchSearch.push(card);
      }
    })
    this.setState( { cardsMatchSearch: cardsMatchSearch } );
  }

  handleVote(card, button) {
    let cardKey = card.props.cardToRender.key;
    let parsedCard = JSON.parse(localStorage.getItem(cardKey));
    let totalCards = this.findCardInState(cardKey, parsedCard);

    if (button === 'upvote') {
      parsedCard.quality === 'swill' 
      ? parsedCard.quality = 'plausible'
      : parsedCard.quality = 'genius'
    } else {
      parsedCard.quality === 'genius'
      ? parsedCard.quality = 'plausible'
      : parsedCard.quality = 'swill'
    }

    this.setState( { totalCards: totalCards } )
    this.storeInLocalStorage(cardKey, parsedCard);
  }

  handleDelete(card) {
    let cardKey = card.props.cardToRender.key;
    localStorage.removeItem(cardKey);
    let totalCards = this.findCardInState(cardKey)
    this.setState( { totalCards: totalCards } )
  }

  componentDidMount() {
    this.checkLocalStorage();
  }

  findCardInState(cardKey, interestCard) {
    let totalCards = this.state.totalCards;
      for(let i = 0; i < totalCards.length; i++) {
        if(interestCard && totalCards[i].key === cardKey) {
          totalCards[i] = interestCard
        } else if (!interestCard && totalCards[i].key === cardKey) {
          totalCards.splice(i, 1)
        }
      }
    return totalCards;
  }

  storeInLocalStorage(key, card) {
    localStorage.setItem( key, JSON.stringify(card));
  }

  storeNewCard() {
    let timeStamp = Date.now();
    let newCard = { 
                    key: timeStamp,
                    title: this.state.title,
                    body: this.state.body,
                    quality: 'swill'
                  }
    this.storeInLocalStorage(newCard.key, newCard)
    this.setState( {
      title: '',
      body: '',
      totalCards: [ ...this.state.totalCards, newCard ]
    } );
  }

  returnCards() {
    if(this.state.cardsMatchSearch.length) {
      return this.state.cardsMatchSearch
    } else {
      return this.state.totalCards
    }
  }

  render() {  
    return (    
      <div>
        <Welcome storeNewCard={ this.storeNewCard }
                 handleInputChange={ this.handleInputChange }
                 inputValues={ { title: this.state.title,
                                 body: this.state.body
                             } }
        />
        <CardContainer cardsToRender={ this.returnCards() }
                       handleInputChange={ this.handleInputChange }
                       handleVote={ this.handleVote }
                       handleDelete={ this.handleDelete }
                       handleEditedContent={ this.handleEditedContent }
        />
      </div>
    )
  }
}