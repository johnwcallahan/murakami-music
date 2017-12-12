import _ from "lodash";
import axios from "axios";
import React from "react";

import Container from "./Container";
import Header from "./Header";
import Results from "./Results";

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      books: [],
      composers: [],
      genres: [],
      refs: []
    };
    this.toggleParam = this.toggleParam.bind(this);
  }

  toggleParam(type, param) {
    this.setState(() => {
      return { [type]:  _.xor(this.state[type], [param]) };
    }, () => this.getRefs());
  }

  getRefs() {
    // If nothing is selected, show no references
    if (!this.state.books.length
        && !this.state.composers.length
        && !this.state.genres.length) {
      this.setState({ refs: [] });
    }

    let reqBody = {};
    let searchableFields = ["book", "composer", "genre"];

    searchableFields.forEach(field => {
      if (this.state[field + "s"].length) {
        reqBody[field] = this.state[field + "s"];
      }
    });

    axios({
      method: "post",
      url: "http://localhost:3000/api/refs",
      data: reqBody
    }).then(res => {
      this.setState({ refs: res.data.refs });
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <Header />
          </div>
          <div className="col-xs-3">
            <Container type="books" onClick={this.toggleParam} />
          </div>
          <div className="col-xs-6">
            <Results refs={this.state.refs} />
          </div>
          <div className="col-xs-3">
            <Container type="composers" onClick={this.toggleParam} />
          </div>
        </div>
      </div>
    );
  }
}
