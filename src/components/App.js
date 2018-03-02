import React from "react";

import Header from "./Header";
import BookCollectionContainer from "../containers/BookCollectionContainer";
import ComposerCollectionContainer from "../containers/ComposerCollectionContainer";
import GenreCollectionContainer from "../containers/GenreCollectionContainer";
import ReferencesContainer from "../containers/ReferencesContainer";
import ComposerFilterContainer from "../containers/ComposerFilterContainer";
import SpotifyPlayerContainer from "../containers/SpotifyPlayerContainer";
import PlaylistModalContainer from "../containers/PlaylistModalContainer";

import { Grid, Row, Col } from "react-bootstrap";

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Grid fluid={true} className="app-container">
        <PlaylistModalContainer name="playlist-modal"/>
        <Row className="header-container vertical-center-parent">
          <Col lg={8} md={7} xs={12}>
            <Header />
          </Col>
          <Col lg={4} md={5} xs={12} className="vertical-center-parent">
            <SpotifyPlayerContainer />
          </Col>
        </Row>
        <Row className="content-container">
          <Col lg={2} md={3} xs={12} className="book-collection-container collection-container">
            <BookCollectionContainer />
          </Col>
          <Col lg={2} md={3} xs={12} lgPush={8} mdPush={6}className="composer-collection-container collection-container">
            <GenreCollectionContainer />
            <ComposerFilterContainer />
            <ComposerCollectionContainer />
          </Col>
          <Col lg={8} md={6} xs={12} mdPull={3} lgPull={2} className="center-col">
            <ReferencesContainer />
          </Col>          
        </Row> 
      </Grid>
    );
  }
}