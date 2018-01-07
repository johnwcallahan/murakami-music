// import _ from "lodash";
import React from "react";

// import ComposerFilter from "./ComposerFilter";
import ParamCollection from "./ParamCollection";
import FilterParam from "./FilterParam";
import Header from "./Header";
import Results from "./Results";
import { SlideDown } from "react-slidedown";
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
      activeFilter: {
        composer: "",
        book: "",
        genre: ""
      },
      refs: [],
      spotifyIds: [],
      slidedownClosed: true
    };
    this.toggleParam = this.toggleParam.bind(this);
    this.setActiveFilter = this.setActiveFilter.bind(this);
    this.toggleSlidedown = this.toggleSlidedown.bind(this);
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
            genreSelected: true
          });
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

  setActiveFilter(type, text) {
    this.setState(() => {
      return { activeFilter: {...this.state.activeFilter, [type]: text} };
    }, () => this.getRefs());
  }

  toggleSlidedown() {
    this.setState({
      slidedownClosed: !this.state.slidedownClosed
    });
  }

  // Filter composers whose genre is not selected and who are out of bounds in
  // the active filter
  renderedComposers() {
    let composerFilter = this.state.activeFilter.composer.toLowerCase();
    return this.state.composers.filter(composer => {
      return composer.genreSelected
      && (composerFilter == "" || composer.title.toLowerCase().indexOf(composerFilter) > -1);
    });
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
          <div className="col-lg-2 col-xs-12 book-collection-container collection-container">
            <h2 className="collection-header">Books</h2>
            <ParamCollection type="book"
                       onClick={this.toggleParam}
                       params={this.state.books} />
          </div>
          <div className="col-lg-8 col-xs-12 ref-container">
            {/* <SpotifyPlayer tracks={this.state.spotifyIds} > */}
            <Results refs={this.state.refs} />
          </div>
          <div className="col-lg-2 col-xs-12 composer-collection-container collection-container">
            <h2 className="collection-header">Composers</h2>
            <FilterParam type="composer" setActiveFilter={this.setActiveFilter} />
            <button onClick={this.toggleSlidedown} className="filter-by-genre">Filter by genre</button>
            <SlideDown closed={this.state.slidedownClosed}>
              <ParamCollection type="genre"
                         onClick={this.toggleParam}
                         params={this.state.genres} />
            </SlideDown>
            <ParamCollection type="composer"
                       onClick={this.toggleParam}
                       params={this.renderedComposers()} />
          </div>
        </div>
      </div>
    );
  }
}
