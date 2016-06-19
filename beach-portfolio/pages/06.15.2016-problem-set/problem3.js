
// store user's guess
var userGuess;
// store the generated number
var randNumber;
// maximun guesses allowed
var maxGuesses;
// remaining guesses for user
var remainingGuesses;
// game mode
var mode;
// lower bound
var lowerBound = 0;
// upper bound for any of 3 game modes
var upperBound;
// win/lose message;
var winString = "You win!";
var loseString = "You lose.";
// how many tries the user needed
var tries;
// print plural or singular (tries or try)
var tryString;
// continue game or quit
var isPlaying = false;
// holds game output
var resultElement = document.querySelector(".result");

// initialize game mode
var mode = prompt("Choose your game mode: \n 1: easy\t 2: medium\t 3: hard");

// sanitize the input
if (mode == 1 || mode == 2 || mode == 3) {
  // input is legit
  // initialize guesses and upper bound for chosen
  // game mode
  if (mode == 1) {
    maxGuesses = 6;
    upperBound = 20;
  }
  else if (mode == 2) {
    maxGuesses = 4;
    upperBound = 40;
  }
  else if (mode == 3) {
    maxGuesses = 3;
    upperBound = 60;
  }
  // something weird happened
  else {
    // do something about it
    isPlaying = false;
  }
  isPlaying = true;
}
// input not legit
else {
  resultElement.innerHTML = "The mode "+ mode +" is not supported.";
}

while (isPlaying) {
  remainingGuesses = maxGuesses;
  randNumber = Math.floor(Math.random()*upperBound);
  // for debugging
  console.log("randNumber: ", randNumber);
  while (remainingGuesses > 0) {
    userGuess = prompt("You have "+remainingGuesses+" guesses remaining.\n Guess the number between "+lowerBound+" and "+upperBound);
    // too high
    if (userGuess > randNumber) {
      resultElement.innerHTML = "Too high";
      remainingGuesses--;
    }
    // too low
    else if (userGuess < randNumber) {
      resultElement.innerHTML = "Too low";
      remainingGuesses--;
    }
    // got a match
    else {
      // still decrement remainingGuesses
      remainingGuesses--;
      break;
    }
  }
  // calculate number of tries
  tries = maxGuesses - remainingGuesses;
  // use plural "tries" or singular "try"
  if (tries > 1) {
    tryString = "tries";
  }
  else {
    tryString = "try";
  }
  // game results
  if (userGuess == randNumber) {
    resultElement.innerHTML = "<p>"+winString +"<p> The number was "+ randNumber+". <p>You guessed it in "+ tries +" "+tryString;
  }
  else {
    resultElement.innerHTML = "<p>"+loseString +"<p>The number was "+ randNumber +".";
  }
  isPlaying = false;
}
