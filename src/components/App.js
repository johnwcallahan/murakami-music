import React from "react";
import Header from "./Header";
import BookCollection from "./BookCollection";
import ComposerCollection from "./ComposerCollection";
import GenreCollection from "./GenreCollection";
import References from "./References";
import ComposerFilter from "./ComposerFilter";
import SpotifyPlayer from "./SpotifyPlayer";
import PlaylistModal from "./PlaylistModal";
import { Grid, Row, Col } from "react-bootstrap";

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Grid fluid={true} className="app-container">
        <PlaylistModal name="playlist-modal"/>
        <Row className="header-container vertical-center-parent">
          <Col lg={8} md={7} xs={12}>
            <Header />
          </Col>
          <Col lg={4} md={5} xs={12} className="vertical-center-parent">
            <SpotifyPlayer />
          </Col>
        </Row>
        <Row className="content-container">
          <Col lg={2} md={3} xs={12} className="book-collection-container collection-container">
            <BookCollection />
          </Col>
          <Col lg={2} md={3} xs={12} lgPush={8} mdPush={6}className="composer-collection-container collection-container">
            <GenreCollection />
            <ComposerFilter />
            <ComposerCollection />
          </Col>
          <Col lg={8} md={6} xs={12} mdPull={3} lgPull={2} className="center-col">
            <References />
          </Col>
        </Row>
      </Grid>
    );
  }
}