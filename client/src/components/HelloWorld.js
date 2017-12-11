import React from "react";
import axios from "axios";

export default class HelloWorld extends React.Component {

  constructor() {
    super();
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3000/api/composers")
      .then(res => {
        this.setState({ books: res.data });
      });
  }

  render() {
    return (
      <div>
        {this.state.books}
      </div>
    );
  }
}
