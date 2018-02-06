import React from "react";

import BookCollectionContainer from "../containers/BookCollectionContainer";
import ComposerCollectionContainer from "../containers/ComposerCollectionContainer";

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <BookCollectionContainer />
        <ComposerCollectionContainer />
      </div>
    );
  }
}