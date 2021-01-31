import store from '../../store';

let drawEntities = (p) => {
  let { res, playerWidth, playerList, playerID } = store.getState();
  // Draws player
  p.push();
  p.fill('blue');
  p.rect(
    res.width / 2 - playerWidth / 2,
    res.height / 2 - playerWidth / 2,
    playerWidth
  );
  p.pop();
  playerList.forEach((player) => {
    // display other entities
    if (player.id !== playerID) {
      p.push();
      p.fill('cyan');
      p.rect(
        res.width / 2 - playerWidth / 2 + player.pos.x,
        res.height / 2 - playerWidth / 2 + player.pos.y,
        playerWidth
      );
      p.pop();
    }
  });
};

export default drawEntities;
