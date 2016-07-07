
var $headerSpaceEl = $(".header-space");

// render template in appropriate DOM object
var renderTemplate = function(source, $target) {
  var $templateContainer = $("<div>");
  //var template = _.template($(src).html());
  $templateContainer.load(source);
  $target.append($templateContainer);
};

// add an event listener on clickable element
$(".projects-link").on("click", function(event) {
  event.preventDefault();
  // get remote html block by id
  var srcId = "#project-container";
  var srcUrl = "https://ubiquitous-t.github.io/pages/projects.html "+srcId;
  var $target = $(".content-space");
  renderTemplate(srcUrl, $target);
});
