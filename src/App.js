import './App.css';
import React, {Component} from "react";

const mwURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/";
const apiPath = "?key=7dfb90f1-b4b3-44f7-b461-3019f62302d2";
//concat w/ word in middle for fetch

class App extends Component {
  constructor() {
    super();
    this.state = {
      word: null,
      type: null,
      defs: []
    }
    this.inputRef = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);
    this.checkForEnter = this.checkForEnter.bind(this);
  }
  
  onSubmit() {
    console.log(this.inputRef.current.value);
    this.fetchDefData(this.inputRef.current.value.toLowerCase());
  }

  checkForEnter(event) {
    if (event.key === "Enter") {
      console.log(this.inputRef.current.value);
      this.fetchDefData(this.inputRef.current.value.toLowerCase());
    }
  }

  fetchDefData(word) {
    fetch(`${mwURL}${word}${apiPath}`)
    .then(res => res.json())
    .then(result => {
      console.log(result);
      this.setState({
        word: word,
        type: result[0].fl
      })
    })
  }


  render() {

    
    const defs = (
    <div>
      <h3>{this.state.word} - {this.state.type}</h3>
      
    </div>
    );

    return (
      <div className="App">
        <h2> MWDict. </h2>
        <input type="text" id="sbar" ref={this.inputRef} onKeyPress={this.checkForEnter}/>
        <button type="button" onClick={this.onSubmit}>Search</button>
        {this.state.word !== null && this.state.word !== "" ? defs : <div/>}
      </div>
    );

  }
}

export default App;
