
var $headerSpaceEl = $(".header-space");

// render template in appropriate DOM object
var renderTemplate = function(source, $target) {
  var $templateContainer = $("<div>");
  //var template = _.template($(src).html());
  $templateContainer.load(source);
  $target.append($templateContainer);
};

// add an event listener on clickable elements
$(".navbar-btn").on("click", function(event) {
  event.preventDefault();
  // get remote html block by id
  var srcUrl = $(this).attr("href");
  var $target = $(".content-space");
  console.log("this: ", $(this).attr("href"));
  renderTemplate(srcUrl, $target);
});
