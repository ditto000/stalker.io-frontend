import React, { Component } from 'react';

import updateMovement from './Movement';
import { connect } from 'react-redux';

import {
  updatePlayerLocation,
} from '../../actions';


import socket from '../socket';

export class GameUpdate extends Component {
  constructor(props){
    super(props);
    setInterval(this.update.bind(this), 1000/60);
  }
  
  update() {

    let newPos = updateMovement();

    socket.emit('movement', newPos);

    this.props.updatePlayerLocation(newPos);
  }

  render() {
    return (
      <React.Fragment>

      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    playerPos: state.playerPos,
  };
};



export default connect(mapStateToProps, {
  updatePlayerLocation,
})(GameUpdate);