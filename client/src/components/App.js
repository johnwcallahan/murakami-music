// import _ from "lodash";
import React from "react";

// import ComposerFilter from "./ComposerFilter";
import ParamCollection from "./ParamCollection";
import Header from "./Header";
import Results from "./Results";
// import SpotifyPlayer from "./SpotifyPlayer";

import {
  findParamInState,
  toggleSelected,
  updateComposersWithinGenre
} from "../util/helpers";

import { fetchParams, fetchRefs } from "../util/requests";

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      books: [],
      composers: [],
      genres: [],
      refs: [],
      spotifyIds: []
    };
    this.toggleParam = this.toggleParam.bind(this);
    this.filterParam = this.filterParam.bind(this);
  }

  componentDidMount() {
    this.getParams();
  }

  getParams() {
    Promise.all([
      fetchParams("books"),
      fetchParams("composers"),
      fetchParams("genres"),
    ]).then(([books, composers, genres]) => {

      // Create book collection state object
      let bookState = books.data.map(book => {
        return {title: book, selected: false};
      });

      // Create composer collection state object
      let composerState = [];
      for (let genre in composers.data) {
        composers.data[genre].forEach(composer => {
          composerState.push({
            title: composer,
            genre: genre,
            selected: false,
            genreSelected: true});
        });
      }

      // Create genre collection state object
      let genreState = genres.data.map(genre => {
        return {title: genre, selected: true};
      });

      this.setState({
        books: bookState,
        composers: composerState,
        genres: genreState
      }, () => this.getRefs());
    });
  }

  getRefs() {
    fetchRefs({
      // Prepare book state object for request
      books: this.state.books
        .filter(book => book.selected)
        .map(book => book.title),

      // Prepare composer state object for request
      composers: this.state.composers
        .filter(composer => composer.selected)
        .map(composer => composer.title),

    }).then(res => {

      // Parse out Spotify IDs
      let spotifyIds = [];
      res.data.refs.forEach(ref => {
        ref.spotifyId.forEach(id => {
          spotifyIds.push(id);
        });
      });

      this.setState({ refs: res.data.refs, spotifyIds: spotifyIds });
    });
  }

  // On click event
  toggleParam(type, param) {
    // Toggle param
    let toggled = toggleSelected(this.state[type + "s"], param.title);

    // If genre is being toggled, update state of composers within that genre
    if (type == "genre") {
      let genre = findParamInState(this.state.genres, param.title);
      let updatedComposers = updateComposersWithinGenre(this.state.composers, genre);
      this.setState(() => {
        return { composers: updatedComposers, genres: toggled };
      }, () => this.getRefs());
    }

    // If type is "composer" or "book", simply update state with toggled params
    else {
      this.setState(() => {
        return { [type]: toggled };
      }, () => this.getRefs());
    }
  }

  filterParam(param, text) {
    let filtered = this.state.composerMasterList.filter(item => {
      return (item.toLowerCase().indexOf(text.toLowerCase()) > -1
              && this.state.selected[param].indexOf(item) === -1);
    });
    this.setState({ params: { ...this.state.params, [param]: filtered }} );
  }

  // Filter out composers whose genre is not selected
  renderedComposers() {
    return this.state.composers.filter(composer => composer.genreSelected);
  }

  render() {
    return (
      <div className="container-fluid app-container">
        <div className="row header-container">
          <div className="col-xs-12">
            <Header />
          </div>
        </div>
        <div className="row content-container">
          <div className="col-lg-2 col-xs-3 book-list-container list-container">
            <ParamCollection type="book"
                       onClick={this.toggleParam}
                       params={this.state.books} />
          </div>
          <div className="col-lg-8 col-xs-6 ref-container">
            {/* <SpotifyPlayer tracks={this.state.spotifyIds} > */}
            <Results refs={this.state.refs} />
          </div>
          <div className="col-lg-2 col-xs-3 composer-list-container list-container">
            <ParamCollection type="genre"
                       onClick={this.toggleParam}
                       params={this.state.genres} />
            <ParamCollection type="composer"
                       onClick={this.toggleParam}
                       params={this.renderedComposers()} />
          </div>
        </div>
      </div>
    );
  }
}





