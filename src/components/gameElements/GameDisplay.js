import React, { Component } from 'react';
import p5 from 'p5';
import vision from './Vision.png';
import drawBackground from './DrawBackground';
import { connect } from 'react-redux';
import { updateResolution } from '../../actions';

import socket from '../socket';

class GameDisplay extends Component {
  constructor(props) {
    super(props);

    socket.on('gameUpdate', (players) => {
      players.forEach((player) => {
        if (player.id === socket.id) {
          this.setState({ playerX: player.pos.x, playerY: player.pos.y });
        }
      });
    });

    this.canvasRef = React.createRef();
    this.state = {
      // windowWidth: window.innerWidth,
      // windowHeight: window.innerHeight,
      playerLen: 50,
      playerX: 0,
      playerY: 0,
      // visionWidth: window.innerHeight,
      keysDown: {
        w: false,
        a: false,
        s: false,
        d: false,
      },
    };
  }
  updateSetInterval = null;
  handleResize = (e) => {
    this.props.updateResolution({
      width: window.innerWidth,
      height: window.innerHeight,
      visionWidth: window.innerHeight,
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
      drawBackground(
        p,
        this.state.playerLen,
        this.props.visionWidth,
        this.state.playerX,
        this.state.playerY
      );
      // Draws player
      p.push();
      p.fill('blue');
      p.rect(
        this.props.res.width / 2 - this.state.playerLen / 2,
        this.props.res.height / 2 - this.state.playerLen / 2,
        this.state.playerLen
      );
      p.pop();
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
    let newKeysDownState = { ...this.state.keysDown };
    if (e.type === 'keydown') {
      newKeysDownState[e.key] = true;
    } else if (e.type === 'keyup') {
      newKeysDownState[e.key] = false;
    }

    this.setState({ keysDown: newKeysDownState });

    let dirX = 0;
    let dirY = 0;
    for (let element in newKeysDownState) {
      switch (element) {
        case 'w':
          if (newKeysDownState.w) dirY--;
          break;
        case 'a':
          if (newKeysDownState.a) dirX--;
          break;
        case 's':
          if (newKeysDownState.s) dirY++;
          break;
        case 'd':
          if (newKeysDownState.d) dirX++;
          break;
        default:
          break;
      }
    }

    socket.emit('movement', { dirX: dirX, dirY: dirY });
  };
  /**updatePos = () => {
    let { playerX, playerY } = this.state;
    for (let i in this.state.keysDown) {
      if (i === 'w' && this.state.keysDown[i]) {
        playerY -= 5;
      }
      if (i === 's' && this.state.keysDown[i]) {
        playerY += 5;
      }
      if (i === 'a' && this.state.keysDown[i]) {
        playerX -= 5;
      }
      if (i === 'd' && this.state.keysDown[i]) {
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

    this.props.updateResolution({
      width: window.innerWidth,
      height: window.innerHeight,
      visionWidth: window.innerHeight,
    });
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
  };
};

export default connect(mapStateToProps, { updateResolution })(GameDisplay);
