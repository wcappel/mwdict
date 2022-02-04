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
      defs: null
    }
    this.inputRef = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);
    this.checkForEnter = this.checkForEnter.bind(this);
    this.fetchDefData = this.fetchDefData.bind(this);
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
      this.setState({
        word: word,
        defs: result
      })
      console.log(this.state.defs);
    })
  }


  render() {

    console.log(this.state.defs);
    let defs = <div/>;
    if (this.state.defs !== null) {
      if (this.state.defs[0].meta != null) {
        defs = this.state.defs.map(def => {
          return (
            <div key={def.meta.id}>
              <h3 className="defHeader">{def.meta.id.includes(":") ? def.meta.id.substring(0, def.meta.id.length - 2) : def.meta.id}</h3>
              <h5 className="type">{def.fl}</h5>
              
  
              <p></p>
            </div>
          );
        })
      } else {
        const suggestions = this.state.defs.map(def => {
          return (
            <h4 key={def}>{def}</h4>
          );
        })
        defs = (
          <div>
            <h3>Not found, did you mean:</h3>
            {suggestions}
          </div>
          );
      }
    }

    return (
      <div className="App">
        <h2> MWDict. </h2>
        <input type="text" id="sbar" ref={this.inputRef} onKeyPress={this.checkForEnter}/>
        <button type="button" onClick={this.onSubmit}>Search</button>
        {this.state.word !== null && this.state.defs !== null ? defs : <div/>}
      </div>
    );

  }
}

export default App;
