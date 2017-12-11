import React from "react";
import PropTypes from "prop-types";

export default class Results extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let refs = this.props.refs.map(ref => {
      return (
        <li key={ref["_id"]}>
          <p>{ref.book}</p>
          <p>{ref.composer}</p>
          <p>{ref.piece}</p>
          <p>{ref.quote}</p>
          <p>{ref.page}</p>
        </li>
      );
    });
    return (
      <ul>{refs}</ul>
    );
  }
}

Results.propTypes = {
  refs: PropTypes.array
};
