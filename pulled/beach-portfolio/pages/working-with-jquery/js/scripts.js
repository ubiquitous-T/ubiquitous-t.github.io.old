var $allEls = $("html *");
var $bodyEls = $("body *");
var $container = $(".btn-container");

$(".create-paragraph").on("click", function() {
  $(".btn-container").append($('<p/>').text("This is a new paragraph."));
});

$(".turn-blue").on("click", function() {
  // debugging
  console.log($allEls);
  for (var i = 0; i < $allEls.length; i++) {
    $($allEls).css({'background-color':'blue',
      'color':'darkblue', 'border':'solid blue'});
  }
})

$(".fade-out").on("click", function() {
  var $otherEls = $($container).children().not($(".fade-in"));
  for (var i = 0; i < $otherEls.length; i++) {
    // debugging
    console.log("element "+ i +": ", $otherEls[i]);
    $($otherEls[i]).fadeOut();
  }
});

$(".fade-in").on("click", function() {
  var $recoverEls = $(".btn-container button");
  // debugging
  console.log("elements to fade in: ", $recoverEls);
  for (var i = 0; i < $recoverEls.length; i++) {
    $($recoverEls[i]).fadeIn();
  }
});
