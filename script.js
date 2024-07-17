const rock = document.querySelector('.rock')
const paper = document.querySelector('.paper')
const scissors = document.querySelector('.scissors')
const reset = document.querySelector('.reset-score')

const resultBox = document.querySelector('#result-box')
const resultText = document.querySelector('#result')
const moveText = document.querySelector('#moves')
const memoryText = document.querySelector('#memory')

let computerMove;
let result;

let score = JSON.parse(localStorage.getItem('score'));

if (!score) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0,
    }
}

function resetScore () {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    localStorage.removeItem('score');

    resultText = '';
    moveText = '';
    memoryText = '';
}


// let JSON.parse(localStorage.getItem('score'))

function pickComputerMove () {
    let randomNumber = Math.floor(Math.random() * 9) + 1;

    if (randomNumber <= 3) {
        computerMove = 'rock'
    } else if (randomNumber > 3 && randomNumber <= 6 ) {
        computerMove = 'paper'
    }  else if (randomNumber > 6 && randomNumber <= 9 ) {
        computerMove = 'scissors'
    }
    
}

function playGame (e, playerMove) {
    pickComputerMove()

    playerMove = e.target.textContent.toLowerCase()

    if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You Win'
        } else if (computerMove === 'paper') {
            result = 'Tie!!'
        } else if (computerMove === 'scissors') {
            result = 'You Lose'
        }

    } else if (playerMove === 'scissors') {    
        if (computerMove === 'rock') {
            result = 'You Lose'
        } else if (computerMove === 'paper') {
            result = 'You Win'
        } else if (computerMove === 'scissors') {
            result = 'Tie!!'
        }

    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie!!'
        } else if (computerMove === 'paper') {
            result = 'You Lose'
        } else if (computerMove === 'scissors') {
            result = 'You Win'
        }
    }
    
    if (playerMove === 'reset score') {
        result = ''
    }
        

    if (result === 'You Win') {
        score.wins += 1
    } else if (result === 'You Lose') {
        score.losses += 1
    } else if (result === 'Tie!!') {
        score.ties += 1
    } else if (result === '') {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;

        localStorage.removeItem('score');
    }

    localStorage.setItem('score', JSON.stringify(score))

    if (playerMove === 'reset score') {
        moveText.innerText = ''
        resultText.innerText = ''
        memoryText.innerText = ''
    } else {
        resultText.innerText = result;
        moveText.innerText = `You ${playerMove} - ${computerMove} Computer`
        memoryText.innerText = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
    }
    

    // alert(`You picked ${playerMove}, computer picked ${computerMove}. ${result}
    // Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`)
            
}


rock.addEventListener('click',playGame)
scissors.addEventListener('click', playGame)
paper.addEventListener('click', playGame)
reset.addEventListener('click', playGame)