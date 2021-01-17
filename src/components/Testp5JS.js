import React, { Component } from 'react';
import p5 from 'p5';

class Testp5JS extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }
  Sketch = (p) => {
    p.setup = () => {
      p.createCanvas(200, 200);
    };
    p.draw = () => {
      p.background(0);
      p.fill(255);
      p.rect(100, 100, 50, 50);
    };
  };
  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.canvasRef.current);
  }

  render() {
    return <div ref={this.canvasRef} />;
  }
}

export default Testp5JS;
