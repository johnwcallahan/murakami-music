import React from "react";

import Header from "./Header";
import BookCollectionContainer from "../containers/BookCollectionContainer";
import ComposerCollectionContainer from "../containers/ComposerCollectionContainer";
import GenreCollectionContainer from "../containers/GenreCollectionContainer";
import ReferencesContainer from "../containers/ReferencesContainer";
import ComposerFilterContainer from "../containers/ComposerFilterContainer";
import SpotifyPlayerContainer from "../containers/SpotifyPlayerContainer";
import Login from "./Login";

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container-fluid app-container">
        <div className="row header-container vertical-center-parent">
          <div className="col-lg-8 col-md-7 col-xs-12">
            <Login />
            <Header />
          </div>
          <div className="col-lg-4 col-md-5 col-xs-12 vertical-center-parent">
            <SpotifyPlayerContainer />
          </div>
        </div>
        <div className="row content-container">
          <div className="col-lg-2 col-md-3 col-xs-12 book-collection-container collection-container">
            <BookCollectionContainer />
          </div>
          <div className="col-lg-2 col-md-3 col-xs-12 col-md-push-6 col-lg-push-8 composer-collection-container collection-container">
            <GenreCollectionContainer />
            <ComposerFilterContainer />
            <ComposerCollectionContainer />
          </div>
          <div className="col-lg-8 col-md-6 col-xs-12 col-md-pull-3 col-lg-pull-2 center-col">
            <div className="button-container">
            </div>
            <div className="ref-container">
              <ReferencesContainer />
            </div>
          </div>          
        </div>
        
      </div>
    );
  }
}