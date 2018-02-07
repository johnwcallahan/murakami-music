import React from "react";
import PropTypes from "prop-types";

const BookCollection = ({books, onClick}) => {
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
    <div>
      <button className="collection-header">Books</button>
      <ul className="collection book-collection">{bookCollection}</ul>
    </div>
  );
};

BookCollection.propTypes = {
  books: PropTypes.object,
  onClick: PropTypes.func
};

export default BookCollection;