import React, { Component } from 'react';

import updateMovement from './Movement';
import { connect } from 'react-redux';

import {
  updatePlayerList,
  updatePlayerLocation,
} from '../../actions';


import socket from '../socket';

export class GameUpdate extends Component {
  constructor(props){
    super(props);
    this.counter = 0;
    this.flushPos = false;

    setInterval(this.update.bind(this), 1000/60);
  }

  componentDidMount() {
    socket.emit('join', 'test');
    socket.on('gameUpdate', (data) => {

      //update all player's positions
      this.props.updatePlayerList(data.playerList);

      //flush position with server every 2 seconds
      if(this.counter > 120){
        this.counter = 0;
        this.flushPos = true;
        data.playerList.forEach((player) => {
          if (player.id === socket.id) {
            this.props.updatePlayerLocation({
              playerX: player.pos.x,
              playerY: player.pos.y,
            });
          }
        });
      }
    });
  }

  componentWillUnmount() {
    socket.off();
  }
  
  update() {
    this.counter++;

    //skip updating if flushing postition with server
    if(!this.flushPos){
      let newPos = updateMovement();
      
      socket.emit('movement', newPos);

      this.props.updatePlayerLocation(newPos);
    }

    this.flushPos = false;
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
    playerList: state.playerList,
    playerPos: state.playerPos,
  };
};



export default connect(mapStateToProps, {
  updatePlayerList,
  updatePlayerLocation,
})(GameUpdate);