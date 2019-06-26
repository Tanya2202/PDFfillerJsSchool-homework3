let Gamer = require('./Gamer')


module.exports.createPlayer = function(name, wins) {
  const player = new Gamer(name);
  player.resetScore();
  player.setWins(wins);

  return player;
}

module.exports.throwW = function(diceElement, diceElement1, RESET_VALUE, current, activePlayer, limit, players) {
  let dice = Math.floor(Math.random() * 6) + 1;
  let dice1 = Math.floor(Math.random() * 6) + 1;

  diceElement.src = `src/css/dice-${dice}.png`;
  diceElement.style.display = 'block';

  diceElement1.src = `src/css/dice-${dice1}.png`;
  diceElement1.style.display = 'block';

  if (dice !== RESET_VALUE && dice1 !== RESET_VALUE && dice !== dice1) {
    current += dice + dice1;
    document.getElementById('current-'+activePlayer).textContent = current;

    if ((players[activePlayer]).getScore() + current >= limit) {
      const playerName = (players[activePlayer]).name
      const playerWins = parseInt((players[activePlayer]).wins) + 1

      localStorage.setItem('dice_' + playerName, playerWins)

      alert(`Player ${playerName} won!!!`);

      var event = new Event("click");
      document.querySelector('.btn-new').dispatchEvent(event);
      //initGame();
    }

  } else {
    buf = changePlayer(diceElement, diceElement1, current, activePlayer);
    current = buf.current;
    activePlayer = buf.activePlayer;
  }
  return { current:current, activePlayer:activePlayer }
}

const changePlayer = function(diceElement, diceElement1, current, activePlayer) {
  current = 0;
  document.getElementById('current-'+activePlayer).textContent = 0;
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
  activePlayer = +!activePlayer;
  diceElement.style.display = 'none';
  diceElement1.style.display = 'none';
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
  return { current:current, activePlayer:activePlayer }
}
module.exports.changePlayer = changePlayer;

module.exports.saveGame = function(players, current, activePlayer) {
  let activePlayerIns = players[activePlayer]
  activePlayerIns.setScore(activePlayerIns.getScore() + current);
  document.querySelector(`#score-${activePlayer}`).textContent = activePlayerIns.getScore();
}

module.exports.showWinners = function() {
 const localStorageKeys = Object.keys(localStorage);
  let diceKeys = [];
  localStorageKeys.forEach((key) => {
    if (key.includes('dice_')) {
        diceKeys.push(key);
    }
  });

  let winners = {};
  for (let i = 0; i < diceKeys.length; i++) {
    const winsCount = localStorage.getItem(diceKeys[i]);
    winners[diceKeys[i]] = winsCount;
  }

  let winnersSorted = Object.keys(winners).sort(function(a, b) {
    return winners[b] - winners[a];
  });

  let winnersString = '';
  winnersSorted.forEach((winner, key) => {
    const winnerStr = `${key + 1}. ${winner.replace('dice_', '')} - ${winners[winner]} \n`;
    winnersString += winnerStr;
  });

  alert(winnersString);
}