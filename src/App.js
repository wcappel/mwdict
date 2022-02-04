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

    // console.log(this.state.defs);
    let defs = <div/>;
    if (this.state.defs !== null) {
      if (this.state.defs[0].meta != null) {
        defs = this.state.defs.map(ele => {
          return (
            <div key={ele.meta.id}>
              <h3 className="defHeader">{ele.meta.id.includes(":") ? ele.meta.id.substring(0, ele.meta.id.length - 2) : ele.meta.id}</h3>
              <h5 className="type">{ele.fl}</h5>
              {
                //want to map all subelements here into text sections
                Array.isArray(ele.def) !== true ? <div/> : (
                  ele.def.map(def => {
                    console.log(def.sseq);
                    return (
                      def.sseq.map(sense => {
                        //this is a nightmare
                        return (
                          sense.map(senseArr => {
                            console.log(senseArr)
                            return (
                              senseArr.map(senses => {
                                console.log(senses)
                                //now for actual defs
                                return (
                                  
                                  <div key={senses.sn}> 
                                    <p>{senses.sn}</p>
                                    {senses.dt === undefined ? <div/> : (
                                      <p>{senses.dt[0][1]}</p>
                                    )}
                                  </div>
                                )
                              })
                            )
                          })
                        )
                      })
                    );
                  })
                )
              }
  
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
