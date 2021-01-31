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

import socket from '../socket';
import drawEntities from './DrawEntites';

class GameDisplay extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    // this.state = {
    //   playerX: 0,
    //   playerY: 0,
    //   keysDown: {
    //     w: false,
    //     a: false,
    //     s: false,
    //     d: false,
    //   },
    // };
  }
  updateSetInterval = null;
  handleResize = (e) => {
    this.props.updateResolution({
      width: window.innerWidth,
      height: window.innerHeight,
      visionWidth: window.innerHeight,
      playerWidth: window.innerHeight / 30,
    });
    // this.setState({
    //   windowWidth: window.innerWidth,
    //   windowHeight: window.innerHeight,
    //   visionWidth: window.innerHeight,
    // });
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
      drawBackground(p); //, this.state.playerX, this.state.playerY);
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
    // let newKeysDownState = { ...this.state.keysDown };
    if (e.type === 'keydown') {
      // newKeysDownState[e.key] = true;
      this.props.updateKeyPositions({
        key: e.key,
        pressed: true,
      });
    } else if (e.type === 'keyup') {
      // newKeysDownState[e.key] = false;
      this.props.updateKeyPositions({
        key: e.key,
        pressed: false,
      });
    }
    updateMovement();
    // this.setState({ keysDown: newKeysDownState });

    // let dirX = 0;
    // let dirY = 0;
    // for (let element in newKeysDownState) {
    //   switch (element) {
    //     case 'w':
    //       if (newKeysDownState.w) dirY--;
    //       break;
    //     case 'a':
    //       if (newKeysDownState.a) dirX--;
    //       break;
    //     case 's':
    //       if (newKeysDownState.s) dirY++;
    //       break;
    //     case 'd':
    //       if (newKeysDownState.d) dirX++;
    //       break;
    //     default:
    //       break;
    //   }
    // }

    // socket.emit('movement', { dirX: dirX, dirY: dirY });
  };
  /**updatePos = () => {
    let { playerX, playerY } = this.state;
    for (let i in this.props.keysDown) {
      if (i === 'w' && this.props.keysDown[i]) {
        playerY -= 5;
      }
      if (i === 's' && this.props.keysDown[i]) {
        playerY += 5;
      }
      if (i === 'a' && this.props.keysDown[i]) {
        playerX -= 5;
      }
      if (i === 'd' && this.props.keysDown[i]) {
        playerX += 5;
      }
      this.setState({ playerX, playerY });
    }
  };**/
  // mouseMovePos = (e) => {
  //   this.setState({
  //     playerX: (e.clientX * 1000) / this.props.res.width,
  //     playerY: (e.clientY * 1000) / this.props.res.height,
  //   });
  // };
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
          // console.log(this.state.playerX + ', ' + this.state.playerY);
        }
      });
    });

    this.handleResize();
    this.myP5 = new p5(this.Sketch, this.canvasRef.current);
    window.addEventListener('resize', this.handleResize);
    //this.updateSetInterval = setInterval(this.updatePos, 10);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    this.myP5.remove();
    socket.off();
    // clearInterval(this.updateSetInterval);
  }

  render() {
    return (
      <div>
        <div
          ref={this.canvasRef}
          onKeyDown={this.checkKeyEvents}
          onKeyUp={this.checkKeyEvents}
          // onMouseMove={this.mouseMovePos}
          tabIndex={0}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // mapStoreToProps
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
