var logInButton = document.querySelector(".log-in");
var usernameEl = document.querySelector(".username");
var passwordEl = document.querySelector(".password");
var logInArea = document.querySelector(".log-in-area");
var creatingAccount;
var attempts = 0, maxAttempts = 3;

//default operator - whoa
/*get info from our 'server' - if there's nothing,
just use an empty object*/
var users = JSON.parse(localStorage.getItem("users")) || {};

//the long version of the 'users' variable
// if(localStorage.getItem("users") === null){
//   users = {test:"i'm here!"}
// } else {
//   users = localStorage.getItem("users");
// }

$(document).on("click",".close",function(){
  $(this).parent().addClass("animated fadeOutUp");

  $(this).parent().one("animationend",function(){
    $(this).hide().removeClass("fadeOutUp");
  })
});

//indexed
logInButton.onclick = function(){
  if(users[usernameEl.value] !== undefined){
    console.log("users: ", users);
    //username exists
    if(attempts < maxAttempts){
      if(passwordEl.value === users[usernameEl.value]){
        //do the passwords match?
        $("body").append('<div class="alert alert-success alert-dismissible log-in-alert" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>welcome back, ' + usernameEl.value + '!</div>');
        $(".log-in-area").addClass("fadeOutUp");
      } else {
        //incorrect password
        attempts++;

        passwordEl.style.backgroundColor = "lightcoral";
        $(".password").addClass("shake").one("animationend",function(){
          $(this).removeClass("shake");
        });

        //using the falsiness of 0, check if the element
        //does NOT exist
        if(!$(".wrong-pass-alert").length){
          $(".wrong-pass-alert").show();
          $(".wrong-pass-alert").addClass("fadeInDown");
          $(".wrong-pass-alert").one("animationend",function(){
            $(this).removeClass(".fadeInDown");
          })
          //create the element
          $("body").append('<div class="alert alert-danger wrong-pass-alert" role="alert"><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>incorrect password!</strong>' + '<span class=attempts-remaining>' + (maxAttempts - attempts) + '</span> remaining</div>');
        } else {
          $(".wrong-pass-alert").show();
          $(".wrong-pass-alert").addClass("fadeInDown");
          $(".wrong-pass-alert").one("animationend",function(){
            $(this).removeClass(".fadeInDown");
          })
          $(".attempts-remaining").text(maxAttempts - attempts);
        }
      }
    } else {
      logInButton.disabled = true;
      usernameEl.disabled = true;
      passwordEl.disabled = true;
      logInButton.className += " disabled";
      usernameEl.className += " disabled";
      passwordEl.className += " disabled";
      $(".wrong-pass-alert").text("no more password attempts! please try again later.");
    }
  } else {
    //username does not exist
    if(creatingAccount){
      var passwordVerify = document.querySelector(".verify");
      if(passwordVerify.value === passwordEl.value){
        /*setting a value to a non-existent property
        creates that property dynamically*/
        users[usernameEl.value] = passwordEl.value;

        //save their information to the 'server'
        //you cannot save objects to localStorage, only strings
        localStorage.setItem("users",JSON.stringify(users));
        // console.log(usernameEl.value + " created with password " + passwordEl.value);
        $("body").append('<div class="alert alert-success alert-dismissible log-in-alert" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>account created! welcome, ' + usernameEl.value + '!</div>');
      } else {
        alert("passwords need to match!");
      }
      return;
      alert("you'll never see me!")
    }

    var $passwordVerify = $("<input>").addClass("verify animated fadeInDown").attr("type","password");

    $(logInButton).text("create account");
    $passwordVerify.insertAfter($(".password"));

    creatingAccount = true;
  }
};
