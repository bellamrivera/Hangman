var keyboardIds = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var correctWord;
var letterArray;
var guessesLeft = 8;
var arrayToFill;
var correctSound = new Audio("../audio/goodSound.mp4");
var wrongSound = new Audio("../audio/wrongGuess.mp4");
var wonGame = new Audio ("../audio/wonGame.mp4");
var lostGame = new Audio("../audio/lostGame.mp4");
var mute = false;

function generateWord() {
    var codeNumber = Math.floor(Math.random() * Math.floor(words.length));
    correctWord = words[codeNumber];
    letterArray = new Array(correctWord.length);
    for (var i = 0; i < correctWord.length; i++) {
        letterArray[i] = correctWord.charAt(i);
    }
    arrayToFill = [];
    for (var i = 0; i < correctWord.length; i++) {
        arrayToFill[i] = " ";
    }
}

function makeGuess(buttonId) {
    console.log(buttonId);
    var element = document.getElementById(buttonId);
    element.disabled = true;
}

function checkAnswer(buttonId) {
    var inWord = false;
    for (var i = 0; i < correctWord.length; i++) {
        if (letterArray[i] === buttonId.toLowerCase())
            inWord = true;
    }
    return inWord;
}

function setColor(buttonId) {
    if (checkAnswer(buttonId)) {
        document.getElementById(buttonId).style.backgroundColor = "#7CEC73";
    }
    else {
        document.getElementById(buttonId).style.backgroundColor = "#ED6464";
    }
}

function writeGuesses(buttonId) {
    if (!checkAnswer(buttonId)) {
        guessesLeft--;
    }
    document.getElementById("numGuesses").innerHTML = guessesLeft.toString();
}

function disableKeyboard() {
    keyboardIds.forEach(l =>
        document.getElementById(l).disabled = true
    )}

var img = "../images/winnerpic.png";
var firstImg = "../images/loserpic.png";

function loser() {
    if (guessesLeft === 0){
        if (!mute) {
            lostGame.play();
        }
        document.getElementById("loser").src = firstImg.toString();
        document.getElementById("playAgain").style.display = "block";
        document.getElementById("newCategory").style.display = "block";
        document.getElementById("afterGameWord").innerHTML = "The word was: " + correctWord;
        disableKeyboard();

    }
    if (arrayToFill.indexOf(" ") === -1) {
        if (!mute) {
            wonGame.play();
        }
        document.getElementById("winner").src = img.toString();
        document.getElementById("playAgain").style.display = "block";
        document.getElementById("newCategory").style.display = "block";
        document.getElementById("afterGameWord").innerHTML = "The word was: " + correctWord;
        disableKeyboard();

    }
}

function writeLetters(buttonId) {
    if (checkAnswer(buttonId)) {
        for (var i = 0; i < correctWord.length; i++) {
            if (letterArray[i] === buttonId.toLowerCase())
                arrayToFill[i] = buttonId;
        }
    }
    if (correctWord.length < 8)
        document.getElementById("writtenLetters").innerHTML = arrayToFill.join(" ").toString();
    else
        document.getElementById("longWrittenLetters").innerHTML = arrayToFill.join("").toString();
}

function displayMan() {
    if (guessesLeft<8) {
        document.getElementById("manPicture").src = manArray[7-guessesLeft].toString();
    }
}

function makeGuessSound(buttonId){
    if (!mute) {
        if (checkAnswer(buttonId))
            correctSound.play();
        else
            wrongSound.play();
    }
}

function muteOrUnmute(){
    mute=!mute;
    if (mute){
        document.getElementById('muteButton').style.backgroundImage = "url('../images/muted.png')";
    }
    else
        document.getElementById('muteButton').style.backgroundImage = "url('../images/unmuted.png')";
}

function processClick(buttonId) {
    makeGuess(buttonId);
    setColor(buttonId);
    writeGuesses(buttonId);
    writeLetters(buttonId);
    loser();
    displayMan();
    makeGuessSound(buttonId);
}

