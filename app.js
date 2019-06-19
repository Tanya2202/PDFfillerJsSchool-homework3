/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const RESET_VALUE = 2;

let players = [];
let activePlayer = 0;
let current = 0;
let defaultLimit = 100;
let limit = defaultLimit;
const side = ['зліва', 'справа'];

const diceElement = document.querySelector('.dice');
const diceElement1 = document.querySelector('.dice-1');

let Gamer = function(name) {
    this.name = name
    this.score = 0
}

Gamer.prototype.getScore  = function() {
    return this.score
};

Gamer.prototype.setScore  = function(score) {
    this.score = score
};

Gamer.prototype.resetScore  = function() {
    this.score = 0
};

const initGame = () => {
  for(let i in ['0', '1']) {
      const playerName = prompt("#Введіть ім'я гравця " + side[i])
      const player = new Gamer(playerName)
      player.resetScore()
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
  let dice = Math.floor(Math.random() * 6) + 1;
  let dice1 = Math.floor(Math.random() * 6) + 1;

  diceElement.src = `dice-${dice}.png`;
  diceElement.style.display = 'block';

  diceElement1.src = `dice-${dice1}.png`;
  diceElement1.style.display = 'block';

  if (dice !== RESET_VALUE && dice1 !== RESET_VALUE && dice !== dice1) {
    current += dice + dice1;
    document.getElementById('current-'+activePlayer).textContent = current;

    if ((players[activePlayer]).getScore() + current >= limit) {
      alert(`Player ${(players[activePlayer]).name} won!!!`);
      initGame();
    }

  } else {
    changePlayer();
  }
});

const changePlayer = () => {
  current = 0;
  document.getElementById('current-'+activePlayer).textContent = 0;
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
  activePlayer = +!activePlayer;
  diceElement.style.display = 'none';
  diceElement1.style.display = 'none';
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
}

document.querySelector('.btn-hold').addEventListener('click', function() {
  let activePlayerIns = players[activePlayer]
  activePlayerIns.setScore(activePlayerIns.getScore() + current);
  document.querySelector(`#score-${activePlayer}`).textContent = activePlayerIns.getScore();
  changePlayer();
});

document.querySelector('.btn-new').addEventListener('click', function() {
  initGame();
});
