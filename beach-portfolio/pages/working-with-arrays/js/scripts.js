var myRecipe = ["Heat pan on medium heat. ", "Add 2 Tbsp olive oil to pan. ", "Cook franks in pan for 15 minutes. ", "Chop garlic. ", "Dice avocado. ", "Sprinkle avocados with sea salt and chili pepper (powder). ", "Saute garlic in pan for 5 minutes. ", "Toast buns in pan for 3 minutes. ", "Remove buns from pan. ", "Remove garlic from pan. ", "After 15 minutes, place cooked franks on a plate. ", "Spread mustard on buns. ", "Place franks on buns. ", "Spread avocados over franks. ", "Enjoy!"];

console.log(myRecipe[0]);
console.log(myRecipe[myRecipe.length -1]);
console.log(myRecipe[2]);
// get the length
console.log("length: ", myRecipe.length);
// pop last item from array
var lastStep = myRecipe.pop();
// item that was remeved
console.log(lastStep);
// now get the length
console.log("length: ", myRecipe.length);
// push new string to end of array
// console.log(myRecipe.push("Top with onions. "));
var index = myRecipe.push("Top with onions. ");
console.log("new item added: ", index);
// shift method
var shift = myRecipe.shift("Another item added ");
console.log("new length: ", myRecipe.length);
// unshift method
myRecipe.unshift("Yet another item. ");
console.log(myRecipe.length);
