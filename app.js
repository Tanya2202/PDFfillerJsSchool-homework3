/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const RESET_VALUE = 2;

let scores = [0, 0];
let activePlayer = 0;
let current = 0;
let defaultLimit = 100;
let limit = defaultLimit;

const diceElement = document.querySelector('.dice');
const diceElement1 = document.querySelector('.dice-1');

const initGame = () => {
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
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

    if (scores[activePlayer] + current >= limit) {
      alert(`Player ${activePlayer} won!!!`);
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
  scores[activePlayer] += current;
  document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
  changePlayer();
});

document.querySelector('.btn-new').addEventListener('click', function() {
  initGame();
});
