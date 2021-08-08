'use strict';

// ..+ FIRST SOLUTION (NOT FINISH YET) +..
// ---------------------------------------

// let score0 = 0;
// let score1 = 0;
// let currentScore0 = 0;
// let currentScore1 = 0;


// let playerActive1 = true;

// const scoreEl0 = document.getElementById('score--0');
// const scoreEl1 = document.getElementById('score--1');
// const currentEl0 = document.getElementById('current--0');
// const currentEl1 = document.getElementById('current--1');

// const diceEl = document.querySelector('.dice');
// const btnRollEl = document.querySelector('.btn--roll');
// const btnHold = document.querySelector('.btn--hold');


// function updateTextContent( htmlElement, value ) {
//     htmlElement.textContent = value;
// }

// function updateActivePlayer() {
//     if( playerActive1 ) {
//         playerActive1 = false;
//         document.querySelector('.player--0').classList.remove('player--active');
//         document.querySelector('.player--1').classList.add('player--active');
//     }
//     else {
//         playerActive1 = true;
//         document.querySelector('.player--1').classList.remove('player--active');
//         document.querySelector('.player--0').classList.add('player--active');
//     }
// }

// function resetGame() {
//     score0 = 0;
//     score1 = 0;
//     currentScore0 = 0;
//     currentScore1 = 0;

//     scores.forEach( score => score = 0 );
//     currentScores.forEach( currScore => currScore = 0 );

//     scoreEl0.textContent = score0;
//     scoreEl1.textContent = score1;
//     currentEl0.textContent = currentScore0;
//     currentEl1.textContent = currentScore1;
//     diceEl.classList.add('hidden');

//     if( !playerActive1 ) {
//         updateActivePlayer();
//     }
// }

// function rand() {
//     return Math.trunc( Math.random() * 6 ) + 1;
// }

// document.querySelector('.btn--new').addEventListener(
//     'click', () => {
//         resetGame();
//     }
// );

// btnRollEl.addEventListener( 'click', () => {
//     const randomNumber = rand();
//     diceEl.classList.remove('hidden');
//     diceEl.src = `dice-${randomNumber}.png`;

//     if( randomNumber != 1 ) {
//         if( playerActive1 )
//             updateTextContent( scoreEl0, score0 += randomNumber );
//         else {
//             updateTextContent( scoreEl1, score1 += randomNumber );
//         }
//     }
// } );

// btnHold.addEventListener( 'click', () => {
//     if( playerActive1 ) {
//         updateTextContent( currentEl0, currentScore0 += score0 );
//     }
//     else {
//         updateTextContent( currentEl1, currentScore1 += score1 );
//     }
//     updateActivePlayer();
// });



// ..+ SECOND SOLUTION +..
// -----------------------


// Global Variable
// ---------------
// Array and primitive
let scores = [3, 1];
let currentScores = [0, 0];
let currentActive = 0;      // 0: Player1, 1: Player2
let hasWinner = false;
const maxScores = 100;
// Array-like and object
const players = document.querySelectorAll( '.player' );
const scoresEl = document.querySelectorAll('.score');
const currentsEl = document.querySelectorAll( '.current-score' );
// Object
const diceEl = document.querySelector('.dice');


// Function
// -------------------
// Random number generator for Dice
function rand() {
    return Math.trunc( Math.random() * 6 ) + 1;
}
// Update frame of the active player
function updateFrame( index ) {
    currentsEl[index].textContent = currentScores[index];
    scoresEl[index].textContent = scores[index];
}
// Switch player
function switchPlayer() {
    players[currentActive].classList.remove('player--active');

    currentActive = currentActive === 0 ? 1 : 0;

    players[currentActive].classList.add('player--active');
}
// Reset game. It's used in btn--new event listener.
function resetGame() {
    for( let i = 0; i < players.length; ++i ) {
        currentScores[i] = 0;
        scores[i] = 0;
        updateFrame(i);

        players[i].classList.remove('player--winner');
    }

    diceEl.classList.add('hidden');
    if( currentActive === 1 ) {
        switchPlayer();
    }
    // No need to add this commented code below, because `player--winner` initialize after `player--active` in the CSS file.
    // else {
    //     players[currentActive].classList.add('player--active');
    // }

    hasWinner = false;
}


// Testing
// -------
// // Note: Uncomment this testing below to see the FACT.
// // FACT: It always depends the order style of the class in the CSS file. No matter what class is added first in HTML.
// // USED: `background-color` style always used from `player--winner` class. It because the `player-winner` style is declared after `player--active` in the .

// // Player1
// players[0].classList.remove('player--active');
// players[0].classList.add('player--active');
// players[0].classList.add('player--winner')
// // Player2
// players[1].classList.remove('player--active');
// players[1].classList.add('player--winner')
// players[1].classList.add('player--active');


// Initial
// -------
resetGame();
console.log( 'The game is started' );


// Event Handler
// -------------
// If 'New Game' button is clicked
document.querySelector('.btn--new').addEventListener(
    'click', resetGame
);
// If 'Roll Dice' button is clicked
document.querySelector('.btn--roll').addEventListener( 
    'click', () => {
        if( !hasWinner ) {
            const randomNumber = rand();

            diceEl.classList.remove('hidden');
            diceEl.src = `assets/dice-${randomNumber}.png`;

            if( randomNumber != 1 ) {
                currentScores[currentActive] += randomNumber;
                updateFrame(currentActive);
                
                const totalCurrentScore = currentScores[currentActive] + scores[currentActive];
                if( totalCurrentScore >= maxScores ) {
                    // No need to add this commented code below, because `player--winner` initialize after `player--active` in the CSS file.
                    // players[currentActive].classList.remove('player--active');
                    players[currentActive].classList.add('player--winner');
                    hasWinner = true;
                }
            }
            else {
                currentScores[currentActive] = 0;
                updateFrame( currentActive );
                switchPlayer();
            }
        }
});
// If 'Hold' button is clicked
document.querySelector('.btn--hold').addEventListener(
    'click', () => {
        if( !hasWinner ) {
            scores[currentActive] += currentScores[currentActive];
            currentScores[currentActive] = 0;
            updateFrame( currentActive );
            switchPlayer();
        }
});