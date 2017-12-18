import React from "react";
import PropTypes from "prop-types";

export default class ComposerFilter extends React.Component {

  constructor(props) {
    super(props);
    this.filterParam = this.filterParam.bind(this);
    this.handleGenreSelect = this.handleGenreSelect.bind(this);
  }

  filterParam(event) {
    this.props.filterParam("composer", event.target.value);
  }

  handleGenreSelect(event) {
    this.props.handleGenreSelect("genre", event.target.value);
  }

  render() {
    let genres = this.props.genres.map(genre => {
      return (
        <li key={genre}
            onClick={this.handleGenreSelect}
            className={this.props.selected.indexOf(genre) > -1
              ? "selected"
              : "notSelected"}>{genre}</li>
      );
    });
    return (
      <div>
        <input type="text" onChange={this.filterParam} />
        <ul className="genres">
          {genres}
        </ul>
      </div>
    );

  }
}

ComposerFilter.propTypes = {
  filterParam: PropTypes.func,
  handleGenreSelect: PropTypes.func,
  genres: PropTypes.array,
  selected: PropTypes.array
};
