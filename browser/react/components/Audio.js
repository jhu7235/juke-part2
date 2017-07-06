/**
 * ---------------------------------------
 *  EVERYTHING BELOW IS OPTIONAL, AND NOT REQUIRED DURING THE WORKSHOP!
 * ---------------------------------------
 * This component contains all of the state/behavior needed to play music!
 * To make the music come to life, all you need to do is pass down the appropriate props to the
 * components that need them. This is an OPTIONAL exercise that can be done at any point in Juke.
 *
 * To start, we must first cause this component to render at the top of our application
 * INSTEAD of our Main component. That way, our Main compponent will instead by rendered BY the
 * Audio component, allowing to have all of the song state/behavior passed down to it.
 *
 * This is known as `component composition` - it is the same principle as composing multiple
 * functions together to create a new function!
 *
 */
import React, { Component } from 'react';
import Main from './Main';

// creates the Audio element
// While the Audio element is part of HTML5, it doesn't `visually` show up anywhere in the DOM.
// However, we interact with it the same way we would a DOM node. That's pretty cool!

const AUDIO = document.createElement('audio');

// Some utility functions

const mod = (num, m) => ((num % m) + m) % m;

const skip = (interval, { currentSongList, currentSong }) => {
  let idx = currentSongList.map(song => song.id).indexOf(currentSong.id);
  idx = mod(idx + interval, currentSongList.length);
  const next = currentSongList[idx];
  return [next, currentSongList];
};

// The stateful Audio component

export default class Audio extends Component {

  constructor (props) {
    super(props);
    this.state = {
      currentSong: {},
      currentSongList: [],
      isPlaying: false,
      progress: 0
    };

    this.toggle = this.toggle.bind(this);
    this.toggleOne = this.toggleOne.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  componentDidMount () {
    AUDIO.addEventListener('ended', () =>
      this.next());
    AUDIO.addEventListener('timeupdate', () =>
      this.setProgress(AUDIO.currentTime / AUDIO.duration));
  }

  play () {
    AUDIO.play();
    this.setState({ isPlaying: true });
  }

  pause () {
    AUDIO.pause();
    this.setState({ isPlaying: false });
  }

  load (currentSong, currentSongList) {
    AUDIO.src = currentSong.audioUrl;
    AUDIO.load();
    this.setState({
      currentSong: currentSong,
      currentSongList: currentSongList
    });
  }

  startSong (song, list) {
    this.pause();
    this.load(song, list);
    this.play();
  }

  toggleOne (selectedSong, selectedSongList) {
    if (selectedSong.id !== this.state.currentSong.id)
      this.startSong(selectedSong, selectedSongList);
    else this.toggle();
  }

  toggle () {
    if (this.state.isPlaying) this.pause();
    else this.play();
  }

  next () {
    this.startSong(...skip(1, this.state));
  }

  prev () {
    this.startSong(...skip(-1, this.state));
  }

  setProgress (progress) {
    this.setState({ progress: progress });
  }

  render () {
    /**
     * Here, we pass all of the fields on `this.state`, and a few important methods
     * down to Main. Of course, Main won't receive these props if we
     * don't render Audio somewhere....
     */
    return (
      <Main
        {...this.state}
        prev={this.prev}
        next={this.next}
        toggleOne={this.toggleOne}
        toggle={this.toggle}
      />
    );
  }
}
