// Understand the problem:
// Create a game of rock paper scissors that you
// can play against the computer. The game should
// start by asking you for your choice. Your choice
// is then compared in a conditional statement with
// the computer's choice, which is generated by 
// random. If you win the round, you get a point and
// vice versa. This process should repeat in a loop
// for some set number of rounds or until one person
// reaches the desired number of wins, which should
// then end the game and display a message in the
// console telling you whether you won or lost the
// game.

// Odin's pseudocode
// 1. Write a function that returns the computer's
//    choice for a given round. This value is
//    calculated based on the built-in random function
// 2. Write a function that returns the user's choice
//    for a given round. This function, when called,
//    simply gets input from the user and returns it.
// 3. Initialize two variables with the value 0 to keep
//    track of the players' scores.
// 4. Write a function that plays out the round. The
//    function should take the user's choice and the 
//    computer's choice and return nothing, but will
//    compare the choices with each other, declaring 
//    the winner by displaying an appropriate message,
//    and incrementing the appropriate score count
// 5. Write a function that plays out the game. The 
//    game will play out 5 rounds and essentially, you
//    are calling all the functions the same way up until
//    this point 5 times. Use a loop for this, or call the
//    functions in a particular order and using variables 
//    to keep track of the values for certain rounds(?)

// Understand the problem:
// We must find a way to rework the current code for
// this rock paper scissors game from being console-only
// to being playable through user input and visible elements
// on the screen through DOM manipulation.

// My pseudocode
// 1. Completely remove the 'playGame' function.
//    Use buttons to direct the user to the start
//    of the game and to change the elements on the
//    screen to those that ask a user for their choice 
//    in a round (text element asking user for their
//    choice and choice buttons below).
// 2. Rewrite the 'playRound' function to take input
//    from the choice buttons and display the results
//    of the round on the screen (score and winner).
//    This function should run every time the user presses
//    any of the choice buttons and each press establishes
//    a new round in the game, which means that the new
//    results of a round based on the press should be displayed
//    on screen.
// 3. Write a function 'getGameEndStatus' that checks if
//    the total of the players' scores is one less than
//    'numOfRounds'. If this is true, return true because
//    after that round, the game is going to end. Otherwise,
//    return false.
// 4. Initialize a variable 'numOfRounds' to act as
//    the counter for how many rounds should be played.
//    Every time a choice button is pressed, the function
//    that is called back will check if the total of the 
//    two scores (the user and the computer's) is one less
//    than 'numOfRounds' and if so, call the 'playRound' function
//    one more time and display the final round result and 
//    winner of the game on the screen. Otherwise, the function
//    will just call 'playRound'.

function getComputerChoice() {
    let computerChoice = Math.floor(3*Math.random())
    return (computerChoice == 0 ? "rock" 
    : computerChoice == 1 ? "paper" : "scissors");
}

let userScore = 0;
let computerScore = 0;
let numOfRounds = 5;
let numOfPlayedRounds = 0;
const detailsContainer = document.createElement('div');
const userDetailsContainer = document.createElement('div');
let userChoiceText = document.createElement('h2');
userChoiceText.textContent = "User Choice:";
let usersChoice = document.createElement('h3');
userDetailsContainer.appendChild(userChoiceText);
userDetailsContainer.appendChild(usersChoice);
const computerDetailsContainer = document.createElement('div');
let computerChoiceText = document.createElement('h2');
computerChoiceText.textContent = "Computer Choice:";
let computersChoice = document.createElement('h3');
computerDetailsContainer.appendChild(computerChoiceText);
computerDetailsContainer.appendChild(computersChoice);
detailsContainer.style.cssText = "display: flex; gap: 24px;";
detailsContainer.appendChild(userDetailsContainer);
detailsContainer.appendChild(computerDetailsContainer);
const resultsContainer = document.createElement('div');
let resultsText = document.createElement('h2');
let scoresText = document.createElement('h3');
resultsContainer.style.cssText = "width: 100%; border-top: 2px solid black; padding-top: 16px;"
resultsContainer.appendChild(resultsText);
resultsContainer.appendChild(scoresText); 
const roundResultsContainer = document.createElement('div');
roundResultsContainer.style.cssText = "margin-top: 36px; border: 2px solid black; padding: 16px; border-radius: 8px; display: flex; flex-direction: column; gap: 24px;"
roundResultsContainer.appendChild(detailsContainer);
roundResultsContainer.appendChild(resultsContainer);

function playRound(userChoice, computerChoice) {
    document.body.appendChild(roundResultsContainer);
    usersChoice.textContent = userChoice;
    computersChoice.textContent = computerChoice;
    switch (userChoice) {
        case "rock":
            if (computerChoice == "rock") {
                resultsText.textContent = "It was a tie.";
            }
            else if (computerChoice == "paper") {
                resultsText.textContent = "Computer wins.";
                computerScore++;
            }
            else {
                resultsText.textContent = "User wins."
                userScore++;
            }
            break;

        case "paper": 
            if (computerChoice == "rock") {
                resultsText.textContent = "User wins."
                userScore++;
            }
            else if (computerChoice == "paper") {
                resultsText.textContent = "It was a tie.";
            }
            else {
                resultsText.textContent = "Computer wins.";
                computerScore++;
            }
            break;
        
        case "scissors": 
            if (computerChoice == "rock") {
                resultsText.textContent = "Computer wins.";
                computerScore++;
            }
            else if (computerChoice == "paper") {
                resultsText.textContent = "User wins."
                userScore++;
            }
            else {
                resultsText.textContent = "It was a tie.";
            }
            break;
    }
    numOfPlayedRounds++;
    scoresText.textContent = `User score: ${userScore}, Computer Score: ${computerScore}`;
}

function getGameEndStatus() {
    return numOfPlayedRounds == numOfRounds-1 ? true : false;
}

function restartGame() {
    document.body.innerHTML = "";
    document.body.appendChild(introHeader);
    document.body.appendChild(proceedText);
    document.body.appendChild(playGameButton);
    userScore = 0;
    computerScore = 0;
    numOfPlayedRounds = 0;
}

const introHeader = document.querySelector('h1');
const proceedText = document.querySelector('h2');
const playGameButton = document.querySelector('button');
playGameButton.addEventListener('click', function() {
    const gameRoundText = document.createElement('h1');
    gameRoundText.textContent = "Pick one: Rock, Paper, or Scissors?";
    const choiceButtonsContainer = document.createElement('div');
    choiceButtonsContainer.style.cssText = "display: flex; gap: 8px;";
    const choicesArray = ['rock', 'paper', 'scissors'];
    document.body.removeChild(introHeader);
    document.body.removeChild(proceedText);
    document.body.removeChild(playGameButton);
    document.body.appendChild(gameRoundText);
    for (let i = 0; i < 3; i++) {
        const choiceButton = document.createElement('button');
        choiceButton.textContent = choicesArray[i];
        choiceButton.addEventListener('click', function() {
            let userChoice = choiceButton.textContent;
            let computerChoice = getComputerChoice();
            if (getGameEndStatus()) {
                playRound(userChoice, computerChoice);
                document.body.removeChild(choiceButtonsContainer);
                resultsText.textContent = userScore > computerScore ? "USER WINS!" : computerScore > userScore ? "COMPUTER WINS!" : "YOU TIED!";
                scoresText.textContent = `FINAL - User score: ${userScore}, Computer score: ${computerScore}`;
                let restartButton = document.createElement('button');
                restartButton.textContent = "Play again?";
                restartButton.style.cssText = "margin-top: 24px;"
                restartButton.addEventListener('click', restartGame);
                document.body.appendChild(restartButton);
            }
            else {
                playRound(userChoice, computerChoice);
            }
        })
        choiceButtonsContainer.appendChild(choiceButton);
    }
    document.body.appendChild(choiceButtonsContainer);
})