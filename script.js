'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// Selecting elements
let score0El = document.querySelector('#score--0');
let score1El = document.getElementById('score--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let currentScore0El = document.querySelector('#current--0');
let currentScore1El = document.getElementById('current--1');
let scores, currentScore, activePlayer, playing;

//Starting condictions

const init = function(){

    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;


    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;

    diceEL.classList.add('hidden')
    player1El.classList.remove('player--winner');
    player0El.classList.remove('player--winner');
    player1El.classList.add('player--active');
    player0El.classList.remove('player--active');
}
init();


const switchPlayer = function() {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1El.classList.toggle('player--active');
    player0El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function(){
    if(playing) {
        const dice = Math.trunc(Math.random()*6 + 1);
        diceEL.classList.remove('hidden');
        diceEL.src = 'dice-'+dice+'.png';
        if (dice !== 1){
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
})

btnHold.addEventListener('click', function(){
    if (playing) {
        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    
        document.getElementById(`current--${activePlayer}`).textContent = 0;
    
        if(scores[activePlayer] >= 20){
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
            diceEL.classList.add('hidden');
            playing = false;
        } else {
            switchPlayer();
        }
    
    }
})

btnNew.addEventListener('click', init);
