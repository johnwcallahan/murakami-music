import { connect } from "react-redux";
import { toggleBook } from "../actions";

import BookCollection from "../components/BookCollection";

const mapStateToProps = state => ({
  books: state.books
});

const mapDispatchToProps = dispatch => ({
  onClick: book => dispatch(toggleBook(book))
});

const BookCollectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookCollection);

export default BookCollectionContainer;