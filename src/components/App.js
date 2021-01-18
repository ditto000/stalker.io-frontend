import React from 'react';
// import ComponentA from './ComponentA';
// import TestTwoJS from './TestTwoJS';
import GameDisplay from './gameElements/GameDisplay';
import socket from './socket';

class App extends React.Component {
  gameSocket = null;
  componentDidMount() {
    this.gameSocket = socket;
  }
  render() {
    return (
      <div>
        {/* App
        <ComponentA /> */}
        {/* <TestTwoJS /> */}
        <GameDisplay />
      </div>
    );
  }
}

export default App;
