/*
1.) get user hand
2.) calculate random computer hand
3.) compare hands
4.) display results
*/

var userHand;
var randHandNum;
var resultsDiv = document.querySelector(".results");
var isPlaying = true;
var computerHand;
// track scores
var userScore = 0;
var computerScore = 0;
// results colors
var winColor = "green";
var loseColor = "red";
var tieColor = "yellow";
var errorColor = "orange";
// results message
var winMessage = "You win!";
var loseMessage = "You lose!";
var tieMessage = "It's a tie!";
var winningScore = 3;
// do we have a winner
var haveWinner = false;
// background color property
var bodyDiv = document.querySelector(".body");
// hold the scores
var scoreDiv = document.querySelector(".score");

while(isPlaying && !haveWinner){
  userHand = prompt("rock, paper, or scissors?");
  console.log("userHand", userHand);
  randHandNum = Math.floor(Math.random() * 3);

  while(userHand !== "rock" && userHand !== "paper" && userHand !== "scissors"){
    userHand = prompt("not quite. rock, paper, or scissors?");
  }

  if(randHandNum === 0){
    computerHand = "computer threw rock, fam!";
  } else if(randHandNum === 1){
    computerHand = "computer threw paper, fam!";
  } else if(randHandNum === 2){
    computerHand = "computer threw scissors, fam!";
  } else {
    computerHand = "error";
  }

  if(userHand === "rock"){
    if(randHandNum === 0){
      resultsDiv.innerHTML = computerHand + tieMessage;
      scoreDiv.innerHTML = "<span> " +userScore +" </span> <span> "+ computerScore +"</span>";
      bodyDiv.style.backgroundColor = tieColor;
    } else if(randHandNum === 1){
      computerScore++;
      resultsDiv.innerHTML = computerHand + loseMessage;
      scoreDiv.innerHTML = "<span> " +userScore +" </span> <span> "+ computerScore +"</span>";
      bodyDiv.style.backgroundColor = loseColor;
    } else if (randHandNum === 2){
      userScore++;
      resultsDiv.innerHTML = computerHand + winMessage;
      scoreDiv.innerHTML = "<span> " +userScore +" </span> <span> "+ computerScore +"</span>";
      bodyDiv.style.backgroundColor = winColor;
    } else {
      resultsDiv.innerHTML = computerHand;
      bodyDiv.style.backgroundColor = errorColor;
    }
  } else if(userHand === "paper") {
    if(randHandNum === 0){
      userScore++;
      resultsDiv.innerHTML = computerHand + " "+winMessage;
      scoreDiv.innerHTML = "<span> " +userScore +" </span> <span> "+ computerScore +"</span>";
      bodyDiv.style.backgroundColor = winColor;
    } else if(randHandNum === 1){
      resultsDiv.innerHTML = computerHand +" "+ tieMessage;
      scoreDiv.innerHTML = "<span> " +userScore +" </span> <span> "+ computerScore +"</span>";
      bodyDiv.style.backgroundColor = tieColor;
    } else if (randHandNum === 2){
      computerScore++;
      resultsDiv.innerHTML = computerHand +" "+ loseMessage;
      scoreDiv.innerHTML = "<span> " +userScore +" </span> <span> "+ computerScore +"</span>";
      bodyDiv.style.backgroundColor = loseColor;
    } else {
      resultsDiv.innerHTML = computerHand;
      bodyDiv.style.backgroundColor = errorColor;
    }
  } else if(userHand === "scissors"){
    if(randHandNum === 0){
      computerScore++;
      resultsDiv.innerHTML = computerHand +" "+ loseMessage;
      scoreDiv.innerHTML = "<span> " +userScore +" </span> <span> "+ computerScore +"</span>";
      bodyDiv.style.backgroundColor = loseColor
    } else if(randHandNum === 1){
      userScore++;
      resultsDiv.innerHTML = computerHand +" "+ winMessage;
      scoreDiv.innerHTML = "<span> " +userScore +" </span> <span> "+ computerScore +"</span>";
      bodyDiv.style.backgroundColor = winColor;
    } else if (randHandNum === 2){
      resultsDiv.innerHTML = computerHand +" "+ tieMessage;
      scoreDiv.innerHTML = "<span> " +userScore +" </span> <span> "+ computerScore +"</span>";
      bodyDiv.style.backgroundColor = tieColor;
    } else {
      resultsDiv.innerHTML = computerHand;
      bodyDiv.style.backgroundColor = errorColor;
    }
  } else {
    resultsDiv.innerHTML = "sorry! we don't support " + userHand;
  }
  // check for a winner
  if (userScore === winningScore) {
    resultsDiv.innerHTML = "Player wins!";
    haveWinner = true;
  }
  if (computerScore === winningScore) {
    resultsDiv.innerHTML = "Computer wins!";
    haveWinner = true;
  }
  // have a true winner, no more looping
  if (haveWinner) {
    isPlaying = false;
  }
  // no winner yet, keep looping
  else {
    isPlaying = confirm("do you want to play again?");
  }
}
