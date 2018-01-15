import React, { Component } from 'react';
import '../styles/Welcome.css';

export default function Welcome(props) {
  return (
    <div className='Welcome'>
      <h1>
        <span>idea</span>box
      </h1>
      <label htmlFor='title'></label>
      <input type="text" 
             id='title' 
             placeholder='Title'
             value={props.inputValues.title} 
             onChange={(e) => props.handleInputChange(e, 'title')}
      />
      <label htmlFor='body'></label>
      <textarea type="text" 
             id='body' 
             placeholder='Body'
             value={props.inputValues.body} 
             onChange={(e) => props.handleInputChange(e, 'body')}
          > </textarea>
      <button onClick={() => props.storeNewCard()} > 
        save
      </button>
    </div>
  )
}

// export default class Welcome extends Component {
//   constructor() {
//     super();
//     this.state = {
//       title: '',
//       body: '',
//       quality: 'swill'
//     }
//     this.handleTitleChange = this.handleTitleChange.bind(this);
//     this.handleBodyChange = this.handleBodyChange.bind(this);
//     this.handleButtonClick = this.handleButtonClick.bind(this);
//   }

//   handleButtonClick() {
//     this.props.storeNewCard(this.state);
//   }

//   handleTitleChange(e) {
//     this.setState( { 
//       title: e.target.value,
//       body: this.state.body,
//       quality: 'swill' 
//     } );
//   }

//   handleBodyChange(e) {
//     this.setState( {
//       title: this.state.title, 
//       body: e.target.value,
//       quality: 'swill'
//     } );
//   }

//   render() {
//     return (
//       <div className='Welcome'>
//         <h1>
//           <span>idea</span>box
//         </h1>
//         <label htmlFor='title'></label>
//         <input 
//           type="text" 
//           id='title' 
//           placeholder='Title' 
//           onChange={this.handleTitleChange}
//         />
//         <label htmlFor='body'></label>
//         <input 
//           type="text" 
//           id='body' 
//           placeholder='Body' 
//           onChange={this.handleBodyChange}
//         />
//         <button 
//             onClick={this.handleButtonClick}
//             > save
//         </button>
//       </div>
//     )
//   }
// }