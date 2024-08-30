// ASSIGN GLOBAL VARIABLES (I'm gonna puke)
let scoreArray = [0,0,0];
let chosenCPUname;
let playerName;





// EVENT HANDLING ehehehehehehehehehehehehehehehehehehehehehehehehehehe
// On page load, initialize game
document.addEventListener('DOMContentLoaded', () => {
    // Set starting score and round count
    updateScore(scoreArray,"reset");
    console.log("Resetting score: scoreArray now: " + scoreArray);
    
    // Set starting opponent name
    chosenCPUname = getCPUname();
    console.log("Selecting random CPU opponent.");

    // Initialize HTML objects and CSS styles
    const resultsText = document.querySelector(".results-text");
    resultsText.textContent = "Awaiting first round results!";
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
    chosenCPUname = getCPUname();
    const opponentNameText = document.querySelector(".opponent-name");
    opponentNameText.textContent = "Opponent name: " + chosenCPUname;
});

// Set up text input field listener
const textField=document.querySelector("#playerName");
textField.addEventListener("keyup", () => {
    playerName = textField.value;
});

// Set up "Reset" button listener
const resetButton=document.querySelector(".button.reset");
resetButton.addEventListener("click", () => {
    // Reset score
    scoreArray = updateScore(scoreArray,"reset");

    // Reset opponent
    chosenCPUname = getCPUname();

    // Reset player name
    const textField = document.querySelector("#playerName");
    textField.value = "";
    playerName = "";

    // Reset HTML objects and CSS styles
    const resultsText = document.querySelector(".results-text");
    resultsText.textContent = "Awaiting first round results.";
    const playerAction = document.querySelector(".player-action-text");
    playerAction.textContent = null;
    const cpuAction = document.querySelector(".cpu-action-text");
    cpuAction.textContent = null;
    const roundResults = document.querySelector(".results-header-text");
    roundResults.textContent = null;

});

// Set up "No More, Please" game over button listener
const gameOverButton=document.querySelector(".button.game-over");
gameOverButton.addEventListener("click",() => {

    // Remove body content
    const contentDivs=document.querySelectorAll(".content div")
    contentDivs.forEach((div) => {
        div.remove();
    });
    // Create new container
    const contentContainer=document.querySelector(".content");
    const gameOverContainer = document.createElement("div");
    gameOverContainer.classList.add = "container game-over";
    contentContainer.appendChild(gameOverContainer);

    // Add header, text, and refresh button to the new container
    // // Header and text
    const gameOverHeaderText = document.createElement("p");
    gameOverHeaderText.classList.add = "header text game-over";
    const gameOverBodyText = document.createElement("p");
    gameOverBodyText.classList.add = "body text game-over";

    // // // Custom header and body text
    if (scoreArray[0] < scoreArray[1]) {
        gameOverHeaderText.textContent = "VICTORY!";
        gameOverBodyText.textContent = "You're so good at this senpai!  You should teach me how you got so good at this.";
    } else if (scoreArray[0] > scoreArray[1]) {
        gameOverHeaderText.textContent = "DEFEAT!";
        gameOverBodyText.textContent = "You're such a baka, senpai.  But you're cute when you get mad.";
    } else if (scoreArray[0] == scoreArray[1]) {
        gameOverHeaderText.textContent = "DRAW!";
        gameOverBodyText.textContent = "Oh, we did the same thing, senpai! We must be made for each other!";
    };
    gameOverContainer.appendChild(gameOverHeaderText);
    gameOverContainer.appendChild(gameOverBodyText);

    // // Refresh button
    const newGameButton = document.createElement("button");
    newGameButton.classList.add = "button new-game";
    newGameButton.textContent = "Play Again";
    newGameButton.addEventListener("click", () => {
        location.reload();
    });
    gameOverContainer.appendChild(newGameButton);
});





// FUNCTION DEFINITIONS fffffffffffffffffffffffffffffffffffffffffffffff
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


    return inputScoreArray;

}





// CORE GAMEPLAY LOOP CGLCGLCGLCGLCGLCGLCGLCGLCGLCGLCGLCGLCGLCGLCGLCGLC
function playRound(buttonID) {
    let result;

    if (playerName == '' || playerName == undefined) {
        playerName = "Unnamed-yet-heroic MC";
    }

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
            result = "Defeat";
            break;
        case 1:
        case -2:
            scoreArray = updateScore(scoreArray,"playerWins");
            result = "Victory";
            break;
        case 0:
            scoreArray = updateScore(scoreArray,"draw");
            result = "Draw";
            break;
    }

    // Update round results and display results to user
    console.log(`ROUND RESULTS:
    CPU chose ${choiceToStr(cpuChoice)}
    You chose ${choiceToStr(playerChoice)}
    
    Player\t${scoreArray[1]}     CPU\t${scoreArray[0]}`); 

    // // Update results text
    const playerAction = document.querySelector(".player-action-text");
    playerAction.textContent = playerName + " threw " + choiceToStr(playerChoice) + "!";
    const cpuAction = document.querySelector(".cpu-action-text");
    cpuAction.textContent = chosenCPUname + " threw " + choiceToStr(cpuChoice) + "!";
    const resultsHeaderText = document.querySelector(".results-header-text");
    const resultsText = document.querySelector(".results-text");
    
    // // Update custom results text, based on result
    switch (result) {
        case "Victory":
            resultsHeaderText.textContent = "Round won!";
            resultsText.textContent = playerName + " defeated " + chosenCPUname + "!";
            break;
        case "Defeat":
            resultsHeaderText.textContent = "Round lost!";
            resultsText.textContent = playerName + " was defeated by " + chosenCPUname + "!";
            break;
        case "Draw":
            resultsHeaderText.textContent = "Round is a draw!";
            resultsText.textContent = "Neither " + playerName + " nor " + chosenCPUname + " could come out ahead!";
            break;
    }
    
}