import React, { Component } from 'react';
import StatefulAlbums from './StatefulAlbums';
import AllArtists from './AllArtists';
import SingleAlbum from './SingleAlbum';
import SingleArtist from './SingleArtist';
import Sidebar from './Sidebar';
import Player from './Player';
import {HashRouter, Route } from 'react-router-dom';


export default class Main extends Component {

  constructor (props) {
    super(props);
    // this.state = {
    //   selectedAlbum: {}
    // };
    // this.selectAlbum = this.selectAlbum.bind(this);
    // this.deselectAlbum = this.deselectAlbum.bind(this);
  }

  render () {
    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2" />
        <HashRouter>
            <div>
              <Sidebar />
              <div className="col-xs-10">
                <Route exact path="/" component = {StatefulAlbums} />
                <Route path="/albums/:albumId" component={SingleAlbum} />
                <Route exact path="/albums" component = {StatefulAlbums} />
                <Route exact path="/artists" component = {AllArtists} />
                <Route path="/artists/:artistId" component={SingleArtist} />
              </div>
            </div>
        </HashRouter>
        <Player />
      </div>
    );
  }
}
