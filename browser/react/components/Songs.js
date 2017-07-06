import React from 'react';

const Songs = (props) => {

  const songs = props.songs;

  return (
    <div>
      <h3>Songs</h3>
      <table className="table">
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Artists</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {
            songs && songs.map(song => (
              <tr key={song.id}>
                <td>
                  <button className="btn btn-default btn-xs">
                    <span className="glyphicon glyphicon-play" />
                  </button>
                </td>
                <td>{ song.name }</td>
                <td>
                  <span>{ song.artists ? song.artists.map(artist => artist.name).join(', ') : null }</span>
                </td>
                <td>{ song.genre }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default Songs;
