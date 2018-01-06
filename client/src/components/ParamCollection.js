// import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";

export default class ParamCollection extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(item) {
    this.props.onClick(this.props.type, item);
  }

  render() {
    if (!this.props.params.length) {
      return (
        <div>Loading...</div>
      );
    }
    let data = this.props.params.map(item => {
      return (
        <li key={item.title}
            onClick={() => this.handleClick(item)}
            className={item.selected
              ? "selected"
              : "notSelected"}>{item.title}</li>
      );
    });
    return (
      <ul className="list">
        {data}
      </ul>
    );
  }
}

ParamCollection.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  params: PropTypes.array,
  selected: PropTypes.array
};
