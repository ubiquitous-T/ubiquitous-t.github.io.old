var logInEl = document.querySelector(".log-in");
var userNameEl = document.querySelector(".username");
var userErrorEl = document.querySelector(".user-error");
var passwordEl = document.querySelector(".password");
var passErrorEl = document.querySelector(".pass-error");
var confirmPassEl;
// maximum attempts allowed
var maxAttempts = 3;
var counter = 0;
var users = JSON.parse(localStorage.getItem("users")) || {};
console.log("users object: ", users);

logInEl.onclick = function(){
  var tokens = logInEl.className.split('\ ');
  var token;
  console.log("tokens.length", tokens.length);
  for (var i = 0; i < tokens.length; i++) {
    if (tokens[i].trim() === "log-in" || tokens[i].trim() === "sign-up") {
      console.log(tokens[i]);
      token = tokens[i];
      break;
    }
  }
  // button className attribute is "sign-in"
  if (token === "log-in") {
    console.log(("className: ", token));
    signIn();
  }
  // button className attribute is "sign-up"
  else if (token === "sign-up") {
    signUp();
  }
  // when neither exist for some reason
  else {
    console.log("Error!");
    console.log(logInEl);
    console.log(("className: ", token));
  }
}

var signUp = function() {
  console.log("Signing up user");
  confirmErrorEl = document.querySelector(".confirm-pass-error");
  confirmPassEl = document.querySelector("#confirm-password");

  if (userNameEl.value !== "") {
    userNameEl.style.borderColor = "initial";
    userErrorEl.innerHTML = "";
  }
  if (passwordEl.value !== "") {
    passwordEl.style.borderColor = "initial";
    passErrorEl.innerHTML = "";
  }
  if (confirmPassEl.value !== "") {
    confirmPassEl.style.borderColor = "initial";
    confirmErrorEl.innerHTML = "";
  }
  // validate input
  if (userNameEl.value === "" || userNameEl.value === undefined) {
    console.log("username empty");
    userNameEl.style.borderColor = "#dd4b39";
    userErrorEl.style.color = "#dd4b39";
    userErrorEl.innerHTML = "Oops! You forgot your username";
  }
  else if (passwordEl.value === "" || passwordEl === undefined) {
    console.log("password empty");
    passwordEl.style.borderColor = "#dd4b39";
    passErrorEl.style.color = "#dd4b39";
    passErrorEl.innerHTML = "Uh oh! You forgot your password.";
  }
  else if ((confirmPassEl.value !== "" || confirmPassEl.value !== undefined) && confirmPassEl.value !== passwordEl.value) {
    console.log("passwords do not match");
    confirmPassEl.style.borderColor = "#dd4b39";
    confirmErrorEl.style.display = "block";
    confirmErrorEl.style.color = "#dd4b39";
    confirmErrorEl.innerHTML = "Hmm... Check your passwords, they do not match.";
  }
  else {
    users[userNameEl.value] = passwordEl.value;
    // update the storage
    localStorage.setItem("users", JSON.stringify(users));
    // clear input values
    userNameEl.value = "";
    passwordEl.style.borderColor = "";
    passwordEl.value = "";
    confirmPassEl.value = "";
    //localStorage.clear();
    // take user to new page
    window.location = "file:///home/ubiquitoust/ubiquitous-t.github.io/beach-portfolio/pages/login-page/pages/congrats.html";
  }
};

var signIn = function(){
  if (userNameEl.value !== "") {
    userNameEl.style.borderColor = "initial";
    userErrorEl.innerHTML = "";
  }
  if (passwordEl.value !== "") {
    passwordEl.style.borderColor = "initial";
    passErrorEl.innerHTML = "";
  }
  // validate input
  if (userNameEl.value === "") {
    console.log("username empty");
    userNameEl.style.borderColor = "#dd4b39";
    userErrorEl.style.color = "#dd4b39";
    userErrorEl.innerHTML = "Oops! You forgot your username";
  }
  else if (passwordEl.value === "") {
    console.log("password empty");
    passwordEl.style.borderColor = "#dd4b39";
    passErrorEl.style.color = "#dd4b39";
    passErrorEl.innerHTML = "Uh oh! You forgot your password.";
  }
  else {
    if (users[userNameEl.value] !== undefined) {
      // user exists
      if (passwordEl.value === users[userNameEl.value]) {
        // passwords match
        userErrorEl.style.borderColor = "";
        userNameEl.value = "";
        passwordEl.style.borderColor = "";
        passwordEl.value = "";
        passErrorEl.innerHTML = "";
        window.location = "file:///home/ubiquitoust/ubiquitous-t.github.io/beach-portfolio/pages/login-page/pages/main.html";
      }
      else {
        passwordEl.style.borderColor = "#dd4b39";
        passErrorEl.style.display = "block";
        passErrorEl.style.color = "#ff0000";
        passErrorEl.innerHTML = "You entered an incorrect password";
        counter++;
      }
    }
    else {
      // user does not exist
      // create a new container that holds a confirm password input
      var tempEl = document.createElement("div");
      // give it a class name
      tempEl.className = "confirm-container";
      var parent = document.querySelector(".login-area");
      console.log("parent: ", parent);
      parent.insertBefore(tempEl, parent.childNodes[7]);
      // create a span to hold error message
      tempEl = document.createElement("span");
      tempEl.className = "confirm-pass-error";
      parent = document.querySelector(".confirm-container");
      parent.appendChild(tempEl);
      // create an input element for confirm password
      tempEl = document.createElement("input");
      tempEl.type = "password";
      tempEl.className = "password";
      tempEl.id = "confirm-password";
      parent = document.querySelector(".confirm-container");
      parent.insertBefore(tempEl, parent.childNodes[0]);
      // create a label for confirm password input
      tempEl = document.createElement("label");
      tempEl.className = "signin-label";
      tempEl.for = "confirm-password";
      tempEl.innerHTML = "confirm password";
      parent = document.querySelector(".confirm-container");
      parent.insertBefore(tempEl, parent.childNodes[0]);

      // change button value to "Create Account"
      logInEl.innerHTML = "create account";
      logInEl.className = "sign-up";
    }
  }
  if (counter >= maxAttempts) {
    // clear text fields and disable them
    userNameEl.value = "";
    userNameEl.disabled = true;
    passwordEl.value = "";
    passwordEl.disabled = true;
    passErrorEl.innerHTML = "Too many sign-in attempts.\nYour account has been locked!";
  }
};
