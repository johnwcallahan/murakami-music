// import _ from "lodash";
import React from "react";

// import ComposerFilter from "./ComposerFilter";
import ParamCollection from "./ParamCollection";
import Header from "./Header";
import Results from "./Results";
// import SpotifyPlayer from "./SpotifyPlayer";

import { toggleSelected } from "../util/helpers";
import { fetchParams, fetchRefs } from "../util/requests";

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      books: [],
      composers: [],
      genres: [],
      composersTmpStorage: [],
      refs: [],
      spotifyIds: []
    };
    this.handleClick = this.handleClick.bind(this);
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

      let bookState = books.data.map(book => {
        return {title: book, selected: false};
      });

      let composerState = [];
      for (let genre in composers.data) {
        composers.data[genre].forEach(composer => {
          composerState.push({title: composer, genre: genre, selected: false, genreSelected: true});
        });
      }

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

  handleClick(type, param) {
    if (type == "genre") {
      let toggledGenres = toggleSelected(this.state.genres, param.title);
      let composers = this.state.composers;
      composers.forEach(composer => {
        if (composer.genre == param.title) {
          console.log(toggledGenres);
          let theGenre = toggledGenres.filter(genre => genre.title == param.title)[0];
          composer.genreSelected = theGenre.selected;
          if (composer.selected) composer.selected = false;
        }
      });
      this.setState(() => {
        return { composers: composers, genres: toggledGenres };
      }, () => {
        this.getRefs();
      });
    }

    else {
      let toggled = toggleSelected(this.state[type + "s"], param.title);
      this.setState(() => {
        return { [type]: toggled };
      }, () => {
        this.getRefs();
      });
    }
  }

  filterParam(param, text) {
    let filtered = this.state.composerMasterList.filter(item => {
      return (item.toLowerCase().indexOf(text.toLowerCase()) > -1
              && this.state.selected[param].indexOf(item) === -1);
    });
    this.setState({ params: { ...this.state.params, [param]: filtered }} );
  }

  getRefs() {
    fetchRefs({
      books:     this.state.books
                  .filter(book => book.selected)
                  .map(book => book.title),
      composers: this.state.composers
                  .filter(composer => composer.selected)
                  .map(composer => composer.title),
    }).then(res => {
      let spotifyIds = [];
      res.data.refs.forEach(ref => {
        ref.spotifyId.forEach(id => {
          spotifyIds.push(id);
        });
      });
      this.setState({ refs: res.data.refs, spotifyIds: spotifyIds });
    });
  }

  renderedComposers() {
    return this.state.composers.filter(composer => {
      return composer.genreSelected;
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
          <div className="col-lg-2 col-xs-3 book-list-container list-container">
            <ParamCollection type="book"
                       onClick={this.handleClick}
                       params={this.state.books} />
          </div>
          <div className="col-lg-8 col-xs-6 ref-container">
            {/* <SpotifyPlayer tracks={this.state.spotifyIds} > */}
            <Results refs={this.state.refs} />
          </div>
          <div className="col-lg-2 col-xs-3 composer-list-container list-container">
            <ParamCollection type="genre"
                       onClick={this.handleClick}
                       params={this.state.genres} />
            <ParamCollection type="composer"
                       onClick={this.handleClick}
                       params={this.renderedComposers()} />
          </div>
        </div>
      </div>
    );
  }
}
