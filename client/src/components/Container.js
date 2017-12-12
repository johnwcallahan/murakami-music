// import _ from "lodash";
import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

export default class Container extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      active: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(item) {
    this.props.onClick(this.props.type, item);

    // Toggle active state
    if (this.state.active.indexOf(item) > -1) {
      let tmp = this.state.active.slice();
      tmp.splice(this.state.active.indexOf(item), 1);
      this.setState({ active: tmp });
    } else {
      this.setState({
        active: [...this.state.active, item]
      });
    }
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
      return (
        <li key={item}
            onClick={() => this.handleClick(item)}
            className={this.state.active.indexOf(item) > -1
              ? "active"
              : "inactive"}>
        {item}</li>
      );
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
