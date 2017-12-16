// import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";

export default class ParamList extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(item) {
    this.props.onClick(this.props.type, item);
  }

  render() {
    if (!this.props.params.length || !this.props.selected) {
      return (
        <div>Loading...</div>
      );
    }
    let data = this.props.params.map(item => {
      return (
        <li key={item}
            onClick={() => this.handleClick(item)}
            className={this.props.selected.indexOf(item) > -1
              ? "selected"
              : "notSelected"}>{item}</li>
      );
    });
    return (
      <ul className="list">
        {data}
      </ul>
    );
  }
}

ParamList.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  params: PropTypes.array,
  selected: PropTypes.array
};
