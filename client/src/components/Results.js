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
          <p className="ref-title">{ref.book} | {ref.composer} | {ref.piece} | {ref.genre}</p>
          <p>{ref.quote}</p>
          <small>{ref.page}</small>
        </li>
      );
    });
    if (this.props.refs.length === 0) {
      return <p>No results</p>;
    }
    return (
      <ul>{refs}</ul>
    );
  }
}

Results.propTypes = {
  refs: PropTypes.array
};
