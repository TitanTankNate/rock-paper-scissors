
// Randomly generate a CPU choice
function getCPUchoice() {
    return Math.ceil(Math.random() * 3);
}

// Allow the player to choose an option
function getPLYchoice() {
    return parseInt(prompt("1 - Rock, 2 - Paper, 3 - Scissors"));
}

// This function allows for the integer choices to be translated
// to strings easily and universally
function choiceToStr(choiceInt) {
    switch (choiceInt) {
        case 1:
            return "Rock";
        case 2:
            return "Paper";
        case 3:
            return "Scissors";
    }
}

// Intended core gameplay loop
function gameLoop() {
    let continuePlayingBool = true;
    let cpuScore = 0;               
    let plyScore = 0;               

    while (continuePlayingBool) {
        // Obtain CPU and player choices
        const cpuChoice = getCPUchoice();
        const playerChoice = getPLYchoice();

        let result;
    
        // Make mathematical comparison to determine winner
        // Logic: winning choices are always 1 or -2 when
        // subtracting the CPU's choice from the human's.
        // This elegantly handles all possible permutations.
        switch (playerChoice - cpuChoice) {
            case 2:
                result = "Defeat";
                cpuScore++;
                break;
            case 1:
                result = "Victory";
                plyScore++;
                break;
            case 0:
                result = "Draw";
                break;
            case -1:
                result = "Defeat";
                cpuScore++;
                break;
            case -2:
                result = "Victory";
                plyScore++;
                break;
        }

        // Show the results of the round
        alert(`ROUND RESULTS:
        CPU chose ${choiceToStr(cpuChoice)}
        You chose ${choiceToStr(playerChoice)}
        ${result}
        Player\t${plyScore}     CPU\t${cpuScore}`);

        // Ask if player wants to continue the game
        let continueChoice = prompt("Continue playing? Enter y - Yes, n - No");
        switch (continueChoice.toLowerCase()) { // Handle uppercase inputs here
            case "y":
                break;
            case "n":
                console.log("Quitting.");
                continuePlayingBool = false;
                alert(`GAME OVER:
                Player\t${plyScore}     CPU\t${cpuScore}
                
                ${plyScore>cpuScore ? 'Victory!' : (plyScore==cpuScore ? 'Draw.' : 'Defeat!')}`)
                break;
            default:
                console.log("Other key pressed.  Continuing.");
                break;
        }
    }


    
}


// Program body
gameLoop();