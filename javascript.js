// EVENT HANDLING eheheheheheheheheheheheheheheheheheheheh
// Set up choices "click" listener
const choiceButtons=document.querySelectorAll(".button.choice");

choiceButtons.forEach((button) => {
    button.addEventListener("click",() => {
        console.log("Button id: " + button.id + " clicked.")
        playGame(button.id);
    });
});


// Randomly generate a CPU choice
function getCPUchoice() {
    return Math.ceil(Math.random() * 3);
}

// Allow the player to choose an option
function getPLYchoice(buttonID) {
    switch (buttonID) {
        case "3":
            alert("Rock");
            return 1;
        case "4":
            alert("Paper");
            return 2;
        case "5":
            alert("Scissors");
            return 3;
    }
    // return parseInt(prompt("1 - Rock, 2 - Paper, 3 - Scissors"));
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
function playGame(buttonID) {
    let cpuScore = 0;               
    let plyScore = 0;               


    // Obtain CPU and player choices
    const cpuChoice = getCPUchoice();
    const playerChoice = getPLYchoice(buttonID);    //input derived from clickhandler "choiceButtons"

    let result;

    // Make mathematical comparison to determine winner
    // Logic: winning choices are always 1 or -2 when
    // subtracting the CPU's choice from the human's.
    // This elegantly handles all possible permutations.
    switch (playerChoice - cpuChoice) {
        case 2:
        case -1:
            result = "Defeat";
            cpuScore++;
            break;
        case 1:
        case -2:
            result = "Victory";
            plyScore++;
            break;
        case 0:
            result = "Draw";
            break;
    }

    // Update round results
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


// Program body
//gameLoop();