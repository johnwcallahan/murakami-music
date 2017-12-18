import _ from "lodash";
import React from "react";

// import ComposerFilter from "./ComposerFilter";
import ParamList from "./ParamList";
import Header from "./Header";
import Results from "./Results";

import { fetchParams, fetchRefs } from "../util/requests";

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      composerMasterList: [],
      params: {
        book: [],
        composer: [],
        genre: []
      },
      selected: {
        book: [],
        composer: [],
        genre: []
      },
      refs: []
    };
    this.handleClick = this.handleClick.bind(this);
    // this.filterParam = this.filterParam.bind(this);
  }

  componentDidMount() {
    this.getParams();
  }

  getParams() {
    Promise.all([
      fetchParams("book"),
      fetchParams("composer"),
      fetchParams("genre"),
    ]).then(([book, composer, genre]) => {
      this.setState({
        composerMasterList: composer.data.composer,
        params: {
          book: book.data.book,
          composer: composer.data.composer,
          genre: genre.data.genre
        }
      }, () => this.getRefs());
    });
  }

  handleClick(type, param) {
    this.setState(() => {
      return { selected: { ...this.state.selected, [type]:  _.xor(this.state.selected[type], [param]) }};
    }, () => {
      this.getRefs();
    });
  }

  // filterParam(param, text) {
  //   let filtered = this.state.composerMasterList.filter(item => {
  //     return item.toLowerCase().indexOf(text.toLowerCase()) > -1;
  //   });
  //   this.setState({ params: { ...this.state.params, [param]: filtered }} );
  // }

  getRefs() {
    fetchRefs({
      book: this.state.selected.book,
      composer: this.state.selected.composer
    }).then(res => {
      this.setState({ refs: res.data.refs });
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
            <ParamList type="book"
                       onClick={this.handleClick}
                       params={this.state.params.book}
                       selected={this.state.selected.book} />
          </div>
          <div className="col-lg-8 col-xs-6 ref-container">
            <Results refs={this.state.refs} />
          </div>
          <div className="col-lg-2 col-xs-3 composer-list-container list-container">
           {/* <ComposerFilter genres={this.state.params.genre}
                            selected={this.state.selected.genre}
                            filterParam={this.filterParam}
                            handleGenreSelect={this.handleClick} /> */}
            <ParamList type="composer"
                       onClick={this.handleClick}
                       params={this.state.params.composer}
                       selected={this.state.selected.composer} />
          </div>
        </div>
      </div>
    );
  }
}