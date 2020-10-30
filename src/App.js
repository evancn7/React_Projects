import React, { Component } from "react";
import { spotifyArray } from "./spotify";
import cs385spotify from "../images/cs385spotify.png";

const data = spotifyArray;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: " ", len: 0, database: data };
    this.onSearchFormChange = this.onSearchFormChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    console.log("In the constructor App comp");
  } // end constructor
  // search method
  onSearchFormChange(event) {
    this.setState({ searchTerm: event.target.value });
    let sTerm = event.target.value;
    let numChars = sTerm.length;

    this.setState({ len: numChars });
  }
  onButtonClick() {
    // reset the states properties when button clicked
    this.setState({ len: 0 });
    this.setState({ searchTerm: "" });
  }

  render() {
    return (
      <div className="App">
        <img src={cs385spotify} alt="spotify logo" />
        <h1>Spotify Search</h1>

        <SearchForm
          searchTerm={this.state.searchTerm}
          onChange={this.onSearchFormChange}
          onButtonClick={this.onButtonClick}
        />
        <SearchResults
          searchData={this.state.database}
          searchTerm={this.state.searchTerm}
        />
      </div>
    ); // end of return statement
  } // end of render function
} // end of class

//**************************************************//
class SearchForm extends Component {
  render() {
    const searchTermFromProps = this.props.searchTerm;
    const onChangeFromProps = this.props.onChange;
    const onButtonClick = this.props.onButtonClick;
    return (
      <div>
        <form>
          <b>Search </b>
          <input
            type="text"
            value={searchTermFromProps}
            onChange={onChangeFromProps}
          />
          <button onClick={onButtonClick}>Clear</button>
        </form>
      </div>
    );
  }
} // close the ComponentA component
//**************************************************//
class SearchResults extends Component {
  spotifyFilterFunction(searchTerm) {
    return function (obj) {
      let title = obj.title.toLowerCase();
      let artist = obj.artist.toLowerCase();
      let topgenre = obj.topgenre.toLowerCase();

      return (
        (searchTerm !== "" && title.includes(searchTerm.toLowerCase())) ||
        artist.includes(searchTerm.toLowerCase()) ||
        topgenre.includes(searchTerm.toLowerCase())
      );
    };
  }
  render() {
    const arrayPassedAsParameter = this.props.searchData;
    const searchTermFromProps = this.props.searchTerm;
    let numResults = arrayPassedAsParameter.filter(
      this.spotifyFilterFunction(searchTermFromProps)
    ).length;
    return (
      <div className="SearchResultsDisplay">
        <h2>Search Results</h2>
        <hr></hr>
        <h4>There are {numResults} results for your search</h4>
        {arrayPassedAsParameter
          .filter(this.spotifyFilterFunction(searchTermFromProps))
          .map((s) => (
            <div key={s.ID}>
              <p>
                <b>{s.title}</b> | {s.artist} | {s.topgenre}
              </p>
            </div>
          ))}
      </div>
    );
  }
} // close the ComponentB component

export default App;
