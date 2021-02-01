import React, { Component } from 'react';
import p5 from 'p5';
import vision from './Vision.png';
import drawBackground from './DrawBackground';
import { connect } from 'react-redux';
import {
  updateResolution,
  updateKeyPositions,
  updatePlayerList,
  updatePlayerLocation,
} from '../../actions';
import updateMovement from './Movement';
import { ScreenToWorld } from './2DCamera';

import socket from '../socket';
import drawEntities from './DrawEntites';

class GameDisplay extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }
  updateSetInterval = null;
  handleResize = (e) => {
    this.props.updateResolution({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  Sketch = (p) => {
    p.preload = () => {
      this.img = p.loadImage(vision);
    };
    p.setup = () => {
      p.createCanvas(this.props.res.width, this.props.res.height);
      p.frameRate(120);
    };
    p.draw = () => {
      p.resizeCanvas(this.props.res.width, this.props.res.height);
      drawBackground(p);
      drawEntities(p);
      p.image(
        this.img,
        this.props.res.width / 2 - this.props.visionWidth / 2,
        this.props.res.height / 2 - this.props.visionWidth / 2,
        this.props.visionWidth,
        this.props.visionWidth
      );
      p.push();
      p.fill(0);
      // Top black bar
      p.rect(
        0,
        0,
        this.props.res.width,
        this.props.res.height / 2 - this.props.visionWidth / 2
      );
      // Bottom black bar
      p.rect(
        0,
        this.props.res.height / 2 + this.props.visionWidth / 2,
        this.props.res.width,
        this.props.res.height / 2 - this.props.visionWidth / 2
      );
      // Left black bar
      p.rect(
        0,
        0,
        this.props.res.width / 2 - this.props.visionWidth / 2,
        this.props.res.height
      );
      // Right black bar
      p.rect(
        this.props.res.width / 2 + this.props.visionWidth / 2,
        0,
        this.props.res.width / 2 - this.props.visionWidth / 2,
        this.props.res.height
      );
      p.pop();
    };
  };

  checkKeyEvents = (e) => {
    if (e.type === 'keydown') {
      this.props.updateKeyPositions({
        key: e.key,
        pressed: true,
      });
    } else if (e.type === 'keyup') {
      this.props.updateKeyPositions({
        key: e.key,
        pressed: false,
      });
    }
    updateMovement();
  };
  componentDidMount() {
    socket.emit('join', 'test');
    socket.on('gameUpdate', (players) => {
      this.props.updatePlayerList(players);
      players.forEach((player) => {
        if (player.id === socket.id) {
          this.props.updatePlayerLocation({
            playerX: player.pos.x,
            playerY: player.pos.y,
          });
        }
      });
    });

    this.handleResize();
    this.myP5 = new p5(this.Sketch, this.canvasRef.current);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    this.myP5.remove();
    socket.off();
  }
  // testScreenToWorld = (e) => {
  //   console.log(ScreenToWorld(e.pageX, e.pageY));
  // };

  render() {
    return (
      <div>
        <div
          ref={this.canvasRef}
          onKeyDown={this.checkKeyEvents}
          onKeyUp={this.checkKeyEvents}
          // onMouseDown={this.testScreenToWorld}
          tabIndex={0}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    res: state.res,
    visionWidth: state.visionWidth,
    playerWidth: state.playerWidth,
    keysDown: state.keysDown,
    playerList: state.playerList,
    playerPos: state.playerPos,
  };
};

export default connect(mapStateToProps, {
  updateResolution,
  updateKeyPositions,
  updatePlayerList,
  updatePlayerLocation,
})(GameDisplay);
