import React, { Component } from 'react';
import Songs from '../components/Songs';
import axios from 'axios';

export default class SingleAlbum extends Component {

  constructor () {
    super();
    this.state = {
      selectedAlbum: {}
    };
  }

  componentDidMount () {
    const albumId = this.props.match.params.albumId;

    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => this.setState({
        selectedAlbum: album
      }));
  }


  render () {

    const album = this.state.selectedAlbum;

    return (
      <div className="album">
        <div>
          <h3>{ album.name }</h3>
          <img src={ album.imageUrl } className="img-thumbnail" />
        </div>
        <Songs songs={album.songs} />
      </div>
    );
  }
}
