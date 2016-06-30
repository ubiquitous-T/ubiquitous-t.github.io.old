// form input
var $inputEl = $(".user-data");
// search button
var $buttonEl = $(".search-btn");
// element to hold results
var $resultEl = $(".search-results");
// user id to be searched
var userId;

// capture input when focus is lost
$inputEl.on("focusout", function(event) {
  userId = $(this).val().trim();

});
// bind click event on button
$buttonEl.on("click", function() {
  //console.log(userId);
  $.ajax({url:"http://jsonplaceholder.typicode.com/posts?userId=" + userId,
    method:"GET"})
  .success(function(data) {
    $($resultEl).html("");
    $($resultEl).html($(".user-id-template").html());
    $(".user-id").text("userId: "+userId);
    /*
    var idStr = $("<p>").text("userId: "+userId).css({"font-weight":"bold"});
    $($resultEl).append(idStr);
    */


    // array of json objects
    for (var i = 0; i < data.length; i++) {
      /*
      var html = "<div><p><b>title: </b> "+data[i].title+"</p><p><b>body: </b> "+data[i].body+"</p></div><br>";
      */
      //var $userPost = $(".post");
      $($resultEl).append($(".user-post-template").html());
      $(".post-title").text(data[i].title);
      $(".post-body").text(data[i].body);
    }
  });
  //console.log(result);
});
