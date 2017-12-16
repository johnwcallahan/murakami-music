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
          <p>{ref.quote} <small>{ref.page}</small></p>

        </li>
      );
    });
    if (this.props.refs.length === 0) {
      return <p>No results</p>;
    }
    return (
      <div className="results">
        <ul className="ref-list">{refs}</ul>
      </div>
    );
  }
}

Results.propTypes = {
  refs: PropTypes.array
};
