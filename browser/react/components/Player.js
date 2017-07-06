import React from 'react';

const Player = (props) => {

  return (
    <footer>
      <div>
        <div className="pull-left">
          <button className="btn btn-default">
            <span className="glyphicon glyphicon-step-backward"></span>
          </button>
          <button className="btn btn-default">
            <span className="glyphicon glyphicon-play"></span>
          </button>
          <button className="btn btn-default">
            <span className="glyphicon glyphicon-step-forward"></span>
          </button>
        </div>
        <div className="bar">
          <div className="progress">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Player;
