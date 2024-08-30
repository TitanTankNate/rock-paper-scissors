// ASSIGN GLOBAL VARIABLES (I'm gonna puke)
let scoreArray = [0,0,0];

// EVENT HANDLING eheheheheheheheheheheheheheheheheheheheh

// On page load, initialize game
document.addEventListener('DOMContentLoaded', () => {
    updateScore(scoreArray,"reset");
    console.log("Resetting score: scoreArray now: " + scoreArray);
    getCPUname();
    console.log("Selecting random CPU opponent.");
})

// Set up choices "click" listener
const choiceButtons=document.querySelectorAll(".button.choice");

choiceButtons.forEach((button) => {
    button.addEventListener("click",() => {
        // console.log("Button id: " + button.id + " clicked.")
        playRound(button.id);
    });
});

// Set up "Randomnize" button listener
const randomButton=document.querySelector(".button.randomnize-cpu-name");
randomButton.addEventListener("click",() => {
    let chosenCPUname = getCPUname();
    const opponentNameText = document.querySelector(".opponent-name");
    opponentNameText.textContent = "Opponent name: " + chosenCPUname;
});





// Choose random CPU name from list
// -- This function creates a customizable array of names, 
// and randomly selects one from the list.
function getCPUname() {
    let nameList = [
        "Hiroshi",
        "Takumi",
        "Kenji",
        "Yuto",
        "Ryo",
        "Aiko",
        "Yumi",
        "Sakura",
        "Hana",
        "Mei"
    ]
    let chosenCPUname = nameList[Math.floor(Math.random()*10)];
    const opponentNameText = document.querySelector(".opponent-name");
    opponentNameText.textContent = "Opponent name: " + chosenCPUname;
    return chosenCPUname;
}

// Get CPU choice
// -- This function randomly generates a CPU choice
function getCPUchoice() {
    return Math.ceil(Math.random() * 3);
}

// Process player choice
// -- This function analyzes which button was pressed and
// returns the appropriate result.
function getPLYchoice(buttonID) {
    switch (buttonID) {
        case "3":       // Rock
            return 1;
        case "4":       // Paper
            return 2;
        case "5":       // Scissors
            return 3;
    };
}

// Convert numeric choices to strings
// -- This function allows for the integer choices to be translated
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

// Update score
// -- This function accepts the current score, a desired function, and returns
// an updated score.
function updateScore(inputScoreArray, functionToExecute) {
    // Update score array
    switch (functionToExecute) {
        case "playerWins":
            inputScoreArray[1]++;   // Give player a point
            inputScoreArray[2]++;   // Increment round counter
            break;
        case "cpuWins":
            inputScoreArray[0]++;   // Give CPU a point
            inputScoreArray[2]++;   // Increment round counter
            break;
        case "draw":
            inputScoreArray[2]++;   // No points, increment round counter only
            break;
        case "reset":
            inputScoreArray=[0,0,0];
            break;
    }

    // Update HTML objects and CSS
    // // Update scorecards
    const opponentScoreText = document.querySelector(".scorecard.number.opponent");
    opponentScoreText.textContent = inputScoreArray[0];
    const playerScoreText = document.querySelector(".scorecard.number.player");
    playerScoreText.textContent = inputScoreArray[1];

    // // Update results text
    const resultsText = document.querySelector(".container.results");
    resultsText.textContent = "Haha noob"


    return inputScoreArray;

}



// CORE GAMEPLAY LOOP
function playRound(buttonID) {

        // Obtain CPU and player choices
        const cpuChoice = getCPUchoice();
        const playerChoice = getPLYchoice(buttonID);    //input derived from clickhandler "choiceButtons"

        // Make mathematical comparison to determine winner
        // Logic: winning choices are always 1 or -2 when
        // subtracting the CPU's choice from the human's.
        // This elegantly handles all possible permutations.
        switch (playerChoice - cpuChoice) {
            case 2:
            case -1:
                scoreArray = updateScore(scoreArray,"cpuWins");
                break;
            case 1:
            case -2:
                scoreArray = updateScore(scoreArray,"playerWins");
                break;
            case 0:
                scoreArray = updateScore(scoreArray,"draw");
                break;
        }

        // Update round results and display results to user
        console.log(`ROUND RESULTS:
        CPU chose ${choiceToStr(cpuChoice)}
        You chose ${choiceToStr(playerChoice)}
        
        Player\t${scoreArray[1]}     CPU\t${scoreArray[0]}`);

    // }

    
    

    // // Ask if player wants to continue the game
    // let continueChoice = prompt("Continue playing? Enter y - Yes, n - No");
    // switch (continueChoice.toLowerCase()) { // Handle uppercase inputs here
    //     case "y":
    //         break;
    //     case "n":
    //         console.log("Quitting.");
    //         continuePlayingBool = false;
    //         alert(`GAME OVER:
    //         Player\t${plyScore}     CPU\t${cpuScore}
            
    //         ${plyScore>cpuScore ? 'Victory!' : (plyScore==cpuScore ? 'Draw.' : 'Defeat!')}`)
    //         break;
    //     default:
    //         console.log("Other key pressed.  Continuing.");
    //         break;
    // }



    
}


// Program body
//gameLoop();