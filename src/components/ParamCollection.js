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
        <div className="no-results">No results</div>
      );
    }
    let data = this.props.params.map(item => {
      return (
        <li key={item.title}>
          <button onClick={() => this.handleClick(item)}
                  className={item.selected
                    ? "selected"
                    : "notSelected"}>{item.title}</button>
        </li>
      );
    });
    return (
      <ul className={"collection " + this.props.type + "-collection"}>
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
