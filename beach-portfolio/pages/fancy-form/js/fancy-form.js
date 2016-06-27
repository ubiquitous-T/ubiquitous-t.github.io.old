/*
  1. do form validation:
    // reference the submit button
    var $submitButton = $(".submit");
    // use a boolean value as a single point of truth
    validForm = false;
    // extra: use bootstrap tool tip on button
    // query select all input elements
    $inputElements = $("input, textarea").not(".submit");
    // check if input elements have values
    $inputElements.on("keyup", function(){...})
    // be sure to re-disable submit button if validForm becomes false
*/
    //the individual items of this array are NOT jQuery objects
    var $inputElements = $("input").not(".message", ".submit");
    var emailElement = $(".email");
    var $submitButton = $(".submit");
    var isValidForm = function($formElements){

      for(var i = 0; i < $formElements.length; i++){
        //if any form element is blank, return false
        if($($formElements[i]).val() === "") {
          return false;
        }
        // if any form element contains whitespace, return false
        else if (hasWhiteSpace($($formElements[i]).val())) {
          // change element's bg-color
          $($formElements[i]).not(".submit").css({
            'background-color': "lightcoral"
          });
          // activate popover message
          $($formElements[i]).popover({
            placement: "left",
            trigger: "hover",
            content: "Spaces not allowed!"
          });
          return false;
        }
        // change bg-color back to initial state
        $($formElements[i]).not(".submit").css({
          'background-color': 'initial'
        });
        // destroy the popover
        $($formElements[i]).popover("destroy");
      }
      return true;
    }

    // if input has whitespace return true, else return false
    var hasWhiteSpace = function(value) {
          console.log("\""+value+"\"");
          return value.indexOf("\ ") >= 0;
    };

    $(".wrapper").popover({
      placement:"left",
      trigger:"hover",
      content:"please complete all forms"
    })

    $inputElements.on("keyup",function(){
      if(isValidForm($inputElements)){
        $submitButton.removeAttr("disabled");
        $(".wrapper").popover("destroy");
      } else {
        $submitButton.attr("disabled",true);
        $(".wrapper").popover({
          placement:"left",
          trigger:"hover",
          content:"please complete all forms"
        })
      }
    })
