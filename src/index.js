//require('./Gamer.js');

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const functions = require('./functions');

const RESET_VALUE = 2;

let players = [];
let activePlayer = 0;
let current = 0;
let defaultLimit = 100;
let limit = defaultLimit;
const side = ['зліва', 'справа'];

const diceElement = document.querySelector('.dice');
const diceElement1 = document.querySelector('.dice-1');

const initGame = () => {
  for(let i in ['0', '1']) {
    const playerName = prompt("#Введіть ім'я гравця " + side[i])

    const playerWins = localStorage.getItem('dice_' + playerName)

    let player = functions.createPlayer(playerName, 0)

    if (playerWins && playerWins !== null) {
      if (confirm(`${playerName} - це точно Ви?`)) {
        player = functions.createPlayer(playerName, playerWins)
      }
    }

    players[i] = player

    document.getElementById('name-' + i).innerHTML = playerName;
    document.querySelector('#current-' + i).textContent = 0;
    document.querySelector('#score-' + i).textContent = 0;
  }

  activePlayer = 0;
  current = 0;

  if (!document.querySelector(`.player-0-panel`).classList.contains('active')) {
    document.querySelector(`.player-0-panel`).classList.add('active');
  }
  if (document.querySelector(`.player-1-panel`).classList.contains('active')) {
    document.querySelector(`.player-1-panel`).classList.remove('active');
  }

  diceElement.style.display = 'none';
  diceElement1.style.display = 'none';
}

initGame();

document.querySelector('.confirm').addEventListener('click', function() {
  limit = document.getElementById("limit").value;
  if (limit == '') {
    limit = defaultLimit;
  }
});

document.querySelector('.btn-roll').addEventListener('click', function() {
  buf = functions.throwW(diceElement, diceElement1, RESET_VALUE, current, activePlayer, limit, players);
  current = buf.current;
  activePlayer = buf.activePlayer;
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  functions.saveGame(players, current, activePlayer);

  buf = functions.changePlayer(diceElement, diceElement1, current, activePlayer);
  current = buf.current;
  activePlayer = buf.activePlayer;
});

document.querySelector('.btn-new').addEventListener('click', function() {
  initGame();
});

document.querySelector('#showWinners').addEventListener('click', function() {
  functions.showWinners();
});
