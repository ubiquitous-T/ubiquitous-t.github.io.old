var logInEl = document.querySelector(".log-in");
var userNameEl = document.querySelector(".username");
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
  confirmPassErrorEl = document.querySelector(".confirm-pass-error");
  confirmPassEl = document.querySelector("#confirm-password");
  // validate input
  if (userNameEl.value === "" || userNameEl.value === undefined) {
    console.log("username empty");
    userNameEl.style.borderColor = "lightcoral";
  }
  else if (passwordEl.value === "" || passwordEl === undefined) {
    console.log("password empty");
    passwordEl.style.borderColor = "lightcoral";
    passErrorEl.innerHTML = "Passwords cannot be blank";
  }
  else if ((confirmPassEl.value !== "" || confirmPassEl.value !== undefined) && confirmPassEl.value !== passwordEl.value) {
    console.log("passwords do not match");
    confirmPassEl.style.borderColor = "lightcoral";
    confirmPassErrorEl.style.display = "block";
    confirmPassErrorEl.style.color = "lightcoral";
    confirmPassErrorEl.innerHTML = "Passwords do not match";
  }
  else {
    users[userNameEl.value] = passwordEl.value;
    // update the storage
    localStorage.setItem("users", JSON.stringify(users));
    //localStorage.clear();
    // take user to new page
    window.location = "http://ubiquitous-t.github.io";
  }
};

var signIn = function(){
  if (users[userNameEl.value] !== undefined) {
    // user exists
    if (passwordEl.value === users[userNameEl.value]) {
      // passwords match
      userNameEl.value = "";
      passwordEl.style.borderColor = "";
      passwordEl.value = "";
      passErrorEl.innerHTML = "";
      console.log("Welcome, "+userNameEl.value);
    }
    else {
      passwordEl.style.borderColor = "lightcoral";
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
    var parent = document.querySelector(".login-2-area");
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
  if (counter >= maxAttempts) {
    // clear text fields and disable them
    userNameEl.value = "";
    userNameEl.disabled = true;
    passwordEl.value = "";
    passwordEl.disabled = true;
    passErrorEl.innerHTML = "Too many sign-in attempts.\nYour account has been locked!";
  }
};
