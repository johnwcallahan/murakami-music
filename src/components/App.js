import React from "react";

import BookCollectionContainer from "../containers/BookCollectionContainer";
import ComposerCollectionContainer from "../containers/ComposerCollectionContainer";
import GenreCollectionContainer from "../containers/GenreCollectionContainer";

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <BookCollectionContainer />
        <ComposerCollectionContainer />
        <GenreCollectionContainer />
      </div>
    );
  }
}