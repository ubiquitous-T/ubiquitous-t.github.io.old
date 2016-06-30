// user input selector
var $inputEl = $(".user-data");
var $buttonEl = $(".search-btn");
var $thumbEl = $(".photo-thumbs");
var userName;
var $thumbUrlEl;

/* get username from input */
$inputEl.on("focusout", function(event) {
  userName = $(this).val().trim();
});

/* display user's photos */
var renderThumbs = function(thumbData) {
  // add template to the document
  for (var i = 0; i < thumbData.length; i++) {
    $($thumbEl).append($("<div>").attr({"id": "thumb-container-"+i}).css({"display": "inline-block", "padding": "0 10px","width": "200px", "height": "300px"}));

    $("#thumb-container-"+i).append($("<p>").text(thumbData[i].title).css({"padding": "15px 5px", "width": "200px"}));

    $("#thumb-container-"+i).append($("<a>").attr({"class": "thumb-url", "id": "anchor-"+i, "href": thumbData[i].url}).append($("<img>").attr({"id": "thumb-"+i, "src": thumbData[i].thumbnailUrl})));
  }

  $thumbUrlEl = $(".thumb-url");
  $("img").on("click", function(event) {
    event.preventDefault();
    getPhoto($(event.target).parent().attr("href"));
  });

};

/* display photo in modal */
var renderPhoto = function(photoData) {
  console.log("photo ", photoData);
  $(".modal-body").html($(".photo-modal-template").html());
  $(".user-photo").attr("href");
}
/* retrieve a user's photo album */
var getUserAlbum = function(userName) {
  // make an ajax request on user endpoint
  $.ajax({
    url: "http://jsonplaceholder.typicode.com/users/?username="+userName,
    method: "GET"
  })
  .success(function(data, textStatus) {
    userId = data[0].id;

    // make another ajax request on album endpoint
    $.ajax({
      url: "http://jsonplaceholder.typicode.com/albums/1/photos/?albumId="+userId,
      method: "GET"
    })
    .success(function(thumbData) {
      renderThumbs(thumbData);
    })
  })
};

/* retrieve a user's individual photo */
var getPhoto = function(imageUrl) {
  console.log("imageUrl: ", imageUrl);
  $.ajax(imageUrl, {/*url: */
    jsonp: "callback",
    dataType: "jsonp",
    contentType: "image/png",
    mimeType: "application/javascript",
    method: "GET"
  })
  .success(function(photoData) {
    console.log("image",photoData);
    renderPhoto(photoData);
    $(".modal-photo").modal("show");
  })
  .fail(function(object, textStatus, errorThrown) {
    console.log("status: ", textStatus);
    console.log("errorThrown: ", errorThrown);
  })
}

$buttonEl.on("click", function(event) {
  getUserAlbum(userName);
});
/*
$(document).on("click", "a", function(event) {
  event.preventDefault();
  console.log("target", event.target);
  getPhoto($(".thumb-url").attr("href"));
});
*/
