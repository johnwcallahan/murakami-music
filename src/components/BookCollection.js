import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleBook } from "../actions";

export const BookCollection = ({books, onClick}) => {
  let bookArr = [];
  for (let b in books) {
    bookArr.push(books[b]);
  }
  let bookCollection = bookArr.map(b => {
    return (
      <li key={b.book}>
        <button onClick={() => onClick(b.book)}
                className={b.selected ? "selected" : "not-selected"}>
          {b.book}
        </button>
      </li>
    );
  });

  if (books.length == 0) {
    return <div className="no-results">No results</div>;
  }

  return (
    <div style={{"height": "100%"}}>
      <div className="collection-header">Books</div>
      <div className="book-collection-wrap">
        <ul className="collection book-collection">{bookCollection}</ul>
      </div>
    </div>
  );
};

BookCollection.propTypes = {
  books: PropTypes.object,
  onClick: PropTypes.func
};

const mapStateToProps = state => ({
  books: state.books
});

const mapDispatchToProps = dispatch => ({
  onClick: book => dispatch(toggleBook(book))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookCollection);