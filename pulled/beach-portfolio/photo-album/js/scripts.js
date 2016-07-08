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

    $("#thumb-container-"+i).append($("<a>").attr({"class": "thumb-url", "id": "anchor-"+i, "href": thumbData[i].url, "data-toggle": "modal", "data-target": ".user-photo"}).append($("<img>").attr({"id": "thumb-"+i, "src": thumbData[i].thumbnailUrl})));
  }
};

/* display photo in modal */
var renderModal = function(sourceUrl) {
  console.log("src: ", sourceUrl);
  $(".modal-body").html($(".photo-modal-template").html());
  $(".user-photo").attr({src: sourceUrl});
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
  $.ajax({
    url: imageUrl,
    dataType: "jsonp",
    method: "GET"
  })
  .success(function(photoData) {
    console.log("image",photoData);
    renderModal(photoData);
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

$(document).on("click", "img", function(event) {
  //event.preventDefault();
  console.log("parent: ", $(event.target).parent());
  $sourceUrl = $(event.target).parent().attr("href");
  renderModal($sourceUrl);
  $("#my-modal").modal("show");
});
