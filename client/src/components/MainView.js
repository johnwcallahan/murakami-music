import _ from "lodash";
import axios from "axios";
import React from "react";
import Container from "./Container";
import Results from "./Results";

export default class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      book: [],
      composer: [],
      genre: [],
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
    let reqBody = {};
    let searchableFields = ["book", "composer", "genre"];

    searchableFields.forEach(field => {
      if (this.state[field].length) {
        reqBody[field] = this.state[field];
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
      <div>
        <Container type="books" onClick={this.toggleParam} />
        <Container type="composers" onClick={this.toggleParam} />
        <Container type="genres" onClick={this.toggleParam} />
        <Results refs={this.state.refs} />
      </div>
    );
  }
}
