import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

export default class Container extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onClick(this.props.type, e);
  }

  componentDidMount() {
    axios.get("http://localhost:3000/api/" + this.props.type)
      .then(res => {
        this.setState({ data: res.data[this.props.type] });
      });
  }

  render() {
    if (!this.state.data.length) {
      return (
        <div>Loading...</div>
      );
    }
    let data = this.state.data.map(item => {
      return ( <li key={item} onClick={() => this.handleClick(item)}>{item}</li> );
    });
    return (
      <ul>
        {data}
      </ul>
    );
  }
}

Container.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func
};
