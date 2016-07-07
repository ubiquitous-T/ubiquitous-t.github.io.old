
var $headerSpaceEl = $(".header-space");

// render template in appropriate DOM object
var renderTemplate = function($template, $target) {
  var $templateContainer = $("<div>");
  $templateContainer.html($template);
  $target.append($templateContainer);
};

// add an event listener on clickable element
$(".projects-link").on("click", function(event) {
  var url = "https://ubiquitous-t.github.io/pages/projects.html";
  var $projectsTemplate = _.template($(".projects-template").html());
  // load url into template
  $($projectsTemplate).html(url);
  var $target = $(".content-space");
  renderTemplate($projectsTemplate, $target);
});
