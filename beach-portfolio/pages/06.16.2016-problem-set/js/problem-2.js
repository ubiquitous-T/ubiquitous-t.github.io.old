/*
  problem-2.js
  Assign values to an object's properties using
  the querySelector() method in the document object
*/

var htmlElements = {
  imgElement: document.querySelector("img"),
  pElement: document.querySelector("p"),
  inputElement: document.querySelector("input")
}
console.log(htmlElements);
console.log(htmlElements.pElement.textContent);
console.log(htmlElements.inputElement.attributes);
console.log(htmlElements.imgElement.getAttribute("src"));
