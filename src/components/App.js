import React from 'react';
// import ComponentA from './ComponentA';
// import TestTwoJS from './TestTwoJS';
import GameDisplay from './gameElements/GameDisplay';
import GameUpdate from './gameElements/GameUpdate';


class App extends React.Component {
  render() {
    return (
      <div>
        {/* App
        <ComponentA /> */}
        {/* <TestTwoJS /> */}
        <GameDisplay />
        <GameUpdate />
      </div>
    );
  }
}

export default App;
