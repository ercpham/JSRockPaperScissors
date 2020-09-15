/* Plays one round, returning output string and string indicating win, loss, or draw */
function playRound(playerSelection, computerSelection) {

    let state; /* win, lose, draw */
    let beats = "beats"; /* in case of draw, change to "draw" */

    playerSelection = playerSelection.toLowerCase(); /* normalize input */

    /* Change win-state according to player and computer selections */
    switch(playerSelection) {
    case("rock"):
        switch(computerSelection) {
            case("rock"):
                state = "draw";
                break;
            case("paper"):
                state = "lose";
                break;
            case("scissors"):
                state = "win";
                break;
        }
        break;
    case("paper"):
    switch(computerSelection) {
            case("rock"):
                state = "win";
                break;
            case("paper"):
                state = "draw";
                break;
            case("scissors"):
                state = "lose";
                break;
        }
        break;
    case("scissors"):
    switch(computerSelection) {
            case("rock"):
                state = "lose";
                break;
            case("paper"):
                state = "win";
                break;
            case("scissors"):
                state = "draw";
                break;
        }
        break;
    }

    /* Return results */

    /* Draw case */

    /*
    if (state === "draw") {
        beats = "draws";
        return [`You ${capFirst(state)}! ${capFirst(playerSelection)} ${beats} ${capFirst(computerSelection)}.`, state];
    }
    */

    /* Win/Lose case */

    /*
    return (state === "win") ? 
    [`You ${capFirst(state)}! ${capFirst(playerSelection)} ${beats} ${capFirst(computerSelection)}.`, state]:
    [`You ${capFirst(state)}! ${capFirst(computerSelection)} ${beats} ${capFirst(playerSelection)}.`, state];
    */
    document.getElementById("yourchoice").textContent = 
   `You chose: ${capFirst(playerSelection)}`;
    document.getElementById("computerchoice").textContent = 
    `The computer chose: ${capFirst(computerSelection)}`

    if (state === "win") {
        document.getElementById("outputtext").textContent =
            `You ${capFirst(state)}! ${capFirst(playerSelection)} ${beats} 
            ${capFirst(computerSelection)}.`;

        let score = document.getElementById("yourscore").textContent;

        let newScore = parseInt(score.replace(/Your Score: (\d+)+/g, "$1") ) + 1;

        let newText = score.replace(/(\d+)+/g, newScore);

        document.getElementById("yourscore").textContent = newText;

        if (newScore == 5) {
            document.getElementById("winlose").textContent = "You win!";
            const buttons = document.querySelectorAll('button');
            for (let i = 0; i < buttons.length-1; i++) disableButtons(buttons[i]);
        }
    }
    else if (state === "lose") {
        document.getElementById("outputtext").textContent = 
            `You ${capFirst(state)}! ${capFirst(computerSelection)} ${beats} 
            ${capFirst(playerSelection)}.`;

        let score = document.getElementById("computerscore").textContent;

        let newScore = parseInt(score.replace(/Computer Score: (\d+)+/g, "$1") ) + 1;
    
        let newText = score.replace(/(\d+)+/g, newScore);
    
        document.getElementById("computerscore").textContent = newText;

        if (newScore == 5) {
            document.getElementById("winlose").textContent = "You lose.";
            const buttons = document.querySelectorAll('button');
            for (let i = 0; i < buttons.length-1; i++) disableButtons(buttons[i]);
        }
    }
    else {
        beats = "draws";
        document.getElementById("outputtext").textContent = `You ${capFirst(state)}! 
            ${capFirst(playerSelection)} ${beats} ${capFirst(computerSelection)}.`;
    }

}

/* Plays 5 rounds, outputting the results of each round and the final score */
function game() {
    let playerScore = 0;
    let computerScore = 0;

    /* Play 5 rounds */
    for (let i = 0; i < 5; i++) {
        let results = playRound(prompt("Rock, Paper, Scissors?"), computerPlay());

        /* If not draw, increment player or computer score */
        if (results[1] !== "draw")
            results[1] === "win" ? playerScore++ : computerScore++;

        /* Print individual results to console */
        console.log(`Game ${i+1}: ${results[0]}`);
    }

    /* Print final scores to console */
    console.log(`Final Score: ${playerScore}-${computerScore}`);
}

/* Capitalize the first letter of a string */
function capFirst(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/* Randomly return a computer choice */
function computerPlay() {
    let choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random()*3)];
}
function initiatePlay() {
    if (this.textContent == "Reset Scores") {
        document.getElementById("yourscore").textContent = "Your Score: 0";
        document.getElementById("computerscore").textContent = "Computer Score: 0";
        document.getElementById("winlose").textContent = "";
        document.getElementById("yourchoice").textContent = "";
        document.getElementById("computerchoice").textContent = "";
        document.getElementById("outputtext").textContent = "";
        const buttons = document.querySelectorAll('button');
        buttons.forEach(enableButtons);
        return;
    }
    playRound(this.textContent, computerPlay());
}
function listenButtons(button) {
    button.addEventListener('click', initiatePlay);
}

function disableButtons(button) {
    button.disabled = true;
}

function enableButtons(button) {
    button.disabled = false;
}

const buttons = document.querySelectorAll('button');
buttons.forEach(listenButtons);
// game();