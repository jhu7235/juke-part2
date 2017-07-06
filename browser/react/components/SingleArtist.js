import React, { Component } from 'react';
import Songs from '../components/Songs';
import axios from 'axios';
import AllAlbums from './AllAlbums';
import {Link, HashRouter, Route} from 'react-router-dom';

export default class SingleArtist extends Component {

  constructor () {
    super();
    this.state = {
      selectedArtist: {},
      artistAlbums: [],
      artistSongs: []

    };
  }


  componentDidMount () {
    const artistId = this.props.match.params.artistId;

    var artist = axios.get(`/api/artists/${artistId}`);
    var artistSongs = axios.get(`/api/artists/${artistId}/songs`);
    var artistAlbums = axios.get(`/api/artists/${artistId}/albums`);

    Promise.all([artist, artistAlbums, artistSongs])
    .then((artistData) => {
      return artistData.map( response => response.data);
    })
    .then( artistData => {
      this.setState({
        selectedArtist: artistData[0],
        artistAlbums: artistData[1],
        artistSongs: artistData[2]
    });})
    .catch(console.log);
  }


  // render () {


  //   return (
  //     <div className="artist">
  //       <div>
  //         <h3>{ artist.name }</h3>
  //         <img src={ artist.imageUrl } className="img-thumbnail" />
  //       </div>
  //       <AllAlbums albums={artistAlbums} />
  //       <Songs songs={artistSongs} />
  //     </div>
  //   );
  // }

  render () {

    const artist = this.state.selectedArtist;
    const artistAlbums = this.state.artistAlbums;
    const artistSongs = this.state.artistSongs;

    return (
      <div>
        <h3>{ artist.name }</h3>
        <ul className="nav nav-tabs">
          <li><Link to={`/artist/${artist.id}/albums`}>ALBUMS</Link></li>
          <li><Link to="/songs">SONGS</Link></li>
        </ul>
        <HashRouter>
          <div>
            <Route path="/artist/:artistId/albums" render = {() => <AllAlbums albums= {artistAlbums} /> } />
            <Route path="/songs" render = {() => artistSongs } />
          </div>
        </HashRouter>
      </div>
    );
}

}
