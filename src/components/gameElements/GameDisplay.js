import React, { Component } from 'react';
import p5 from 'p5';
import vision from './Vision.png';
import drawBackground from './DrawBackground';

class GameDisplay extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      playerLen: 50,
      playerX: 0,
      playerY: 0,
      visionWidth: window.innerHeight,
      keysDown: {
        w: false,
        a: false,
        s: false,
        d: false,
      },
    };
  }
  handleResize = (e) => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      visionWidth: window.innerHeight,
    });
  };
  Sketch = (p) => {
    p.preload = () => {
      this.img = p.loadImage(vision);
    };
    p.setup = () => {
      p.createCanvas(this.state.windowWidth, this.state.windowHeight);
      // p.frameRate(120);
    };
    p.draw = () => {
      p.resizeCanvas(this.state.windowWidth, this.state.windowHeight);
      drawBackground(
        p,
        this.state.playerLen,
        this.state.visionWidth,
        this.state.playerX,
        this.state.playerY
      );
      // Draws player
      p.push();
      p.fill('blue');
      p.rect(
        this.state.windowWidth / 2 - this.state.playerLen / 2,
        this.state.windowHeight / 2 - this.state.playerLen / 2,
        this.state.playerLen
      );
      p.pop();
      p.image(
        this.img,
        this.state.windowWidth / 2 - this.state.visionWidth / 2,
        this.state.windowHeight / 2 - this.state.visionWidth / 2,
        this.state.visionWidth,
        this.state.visionWidth
      );
      p.push();
      p.fill(0);
      // Top black bar
      p.rect(
        0,
        0,
        this.state.windowWidth,
        this.state.windowHeight / 2 - this.state.visionWidth / 2
      );
      // Bottom black bar
      p.rect(
        0,
        this.state.windowHeight / 2 + this.state.visionWidth / 2,
        this.state.windowWidth,
        this.state.windowHeight / 2 - this.state.visionWidth / 2
      );
      // Left black bar
      p.rect(
        0,
        0,
        this.state.windowWidth / 2 - this.state.visionWidth / 2,
        this.state.windowHeight
      );
      // Right black bar
      p.rect(
        this.state.windowWidth / 2 + this.state.visionWidth / 2,
        0,
        this.state.windowWidth / 2 - this.state.visionWidth / 2,
        this.state.windowHeight
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
  };
  updatePos = () => {
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
  };
  mouseMovePos = (e) => {
    this.setState({
      playerX: (e.clientX * 1000) / this.state.windowWidth,
      playerY: (e.clientY * 1000) / this.state.windowHeight,
    });
  };
  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.canvasRef.current);
    window.addEventListener('resize', this.handleResize);
    setInterval(this.updatePos, 10);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
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

export default GameDisplay;
