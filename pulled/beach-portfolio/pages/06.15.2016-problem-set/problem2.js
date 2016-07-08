
// store user's guess
var userGuess;
// store the generated number
var randNumber;
// maximun guesses allowed
var maxGuesses;
// remaining guesses for user
var remainingGuesses;

var winString = "You win!";
var loseString = "You lose.";
// how many tries the user needed
var tries;
// print plural or singular (tries or try)
var tryString;
// continue game or quit
var isPlaying = true;
// holds game output
var resultElement = document.querySelector(".result");

while (isPlaying) {
  remainingGuesses = maxGuesses = 3;randNumber = Math.floor(Math.random()*10);
  // for debugging
  console.log("randNumber: ", randNumber);
  while (remainingGuesses > 0) {
    userGuess = prompt("You have "+remainingGuesses+" guesses remaining. Guess a number");
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
  isPlaying = confirm("Play again?");
}
