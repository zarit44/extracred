var Word = require("./words.js");
var inquirer = require("inquirer");


var letterArray = "abcdefghijklmnopqrstuvwxyz";


var movies = [
    "maleficent",
    "fight club",
    "zombieland",
    "star wars",
    "jumanji",
    "cinderella"
];


var randomStuff = Math.floor(Math.random() * movies.length);
var randomWord = movies[randomStuff];


var computerWord = new Word(randomWord);

var newWord = false;


var wrongLetters = [];
var correctLetters = [];


var guessesLeft = 10;

function letsPlay() {

    if (newWord) {

        var randomStuff = Math.floor(Math.random() * movies.length);
        var randomWord = movies[randomStuff];


        computerWord = new Word(randomWord);

        newWord = false;
    }


    var wordComplete = [];
    computerWord.objArray.forEach(completeCheck);


    if (wordComplete.includes(false)) {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Movie titles! Guess any letter:",
                    name: "userinput"
                }
            ])
            .then(function (input) {
                if (
                    !letterArray.includes(input.userinput) ||
                    input.userinput.length > 1
                ) {
                    console.log("\nTry again!\n");
                    letsPlay();
                } else {
                    if (
                        wrongLetters.includes(input.userinput) ||
                        correctLetters.includes(input.userinput) ||
                        input.userinput === ""
                    ) {
                        console.log("\nEnter another letter.\n");
                        letsPlay();
                    } else {

                        var wordCheckArray = [];

                        computerWord.userGuess(input.userinput);


                        computerWord.objArray.forEach(wordCheck);
                        if (wordCheckArray.join("") === wordComplete.join("")) {
                            console.log("\nWrong\n");

                            wrongLetters.push(input.userinput);
                            guessesLeft--;
                        } else {
                            console.log("\nCorrect!\n");

                            correctLetters.push(input.userinput);
                        }

                        computerWord.log();


                        console.log("Guesses Left: " + guessesLeft + "\n");


                        console.log(
                            "Letters Guessed: " + wrongLetters.join(" ") + "\n"
                        );


                        if (guessesLeft > 0) {

                            letsPlay();
                        } else {
                            console.log("HAH LOSER!\n");

                            restartGame();
                        }

                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        }
                    }
                }
            });
    } else {
        console.log("YOU WIN! YAYYYYY!!!!\n");

        restartGame();
    }

    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }
}

function restartGame() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What now?",
                choices: ["Play Again", "Exit"],
                name: "restart"
            }
        ])
        .then(function (input) {
            if (input.restart === "Play Again") {
                newWord = true;
                wrongLetters = [];
                correctLetters = [];
                guessesLeft = 10;
                letsPlay();
            } else {
                return;
            }
        });
}

letsPlay();