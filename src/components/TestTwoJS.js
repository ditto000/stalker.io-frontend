import React, { Component } from 'react';
import Two from 'two.js';

class TestTwoJS extends Component {
  constructor(props) {
    super(props);
    this.drawingRef = React.createRef();
    console.log(this.drawingRef);
  }
  componentDidMount() {
    var params = { width: 285, height: 200 };
    var two = new Two(params).appendTo(this.drawingRef.current);
    var circle = two.makeCircle(72, 100, 50);
    var rect = two.makeRectangle(213, 100, 100, 100);
    circle.fill = '#FF8000';
    circle.stroke = 'orangered';
    circle.linewidth = 5;

    rect.fill = 'rgb(0, 200, 255)';
    rect.opacity = 0.75;
    rect.noStroke();
    two.update();
  }
  render() {
    return <div ref={this.drawingRef} />;
  }
}

export default TestTwoJS;
