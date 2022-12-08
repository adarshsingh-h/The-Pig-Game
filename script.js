'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions
diceEl.classList.add('hidden');

let scores, currScore, activePlayer, playing;

//Starting conditions
const init = function() {
    scores = [0, 0];
    activePlayer = 0;
    currScore = 0;
    playing  = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//Rolling dice functionality
btnRoll.addEventListener('click', function() {
    //Generate random rolls
    if(playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;
    
    //Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //Check if 1 is rolled
    if(dice !== 1) {
        //Add current score to the main score
        currScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currScore;
    }
    else 
        //Switch Player
        switchPlayer();
    }
    
});

//Hold Button Functionality
btnHold.addEventListener('click', function() {
    //1.Add the current score to the main score
    if(playing) {
        scores[activePlayer] += currScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    //2. Check if score >= 100 for any player
    //Finish the Game
    if(scores[activePlayer] >= 100) {
        playing = false;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }
    //Switch to the next player
    else
        switchPlayer();
    }
});

//New Game Functionality
btnNew.addEventListener('click', init);
