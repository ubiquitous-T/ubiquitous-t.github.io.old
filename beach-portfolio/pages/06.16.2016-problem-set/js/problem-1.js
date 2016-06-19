/*
Create a myCat object.
Give the object some properties.
Change the value of its properties (observe in console.log);
Add propterites to the object.
*/
var myCat = {
  name: "Theon",
  age: 1,
  isAlive: true,
  breed: "Orange Tabby",
  color: "Orange",
  isTame: false
};

console.log(myCat);
console.log("name: ", myCat.name);
console.log("age: ", myCat.age);
console.log("is alive: ",myCat.isAlive);
console.log("breed: ",myCat.breed);
console.log("color: ", myCat.color);
console.log("isTame: ", myCat.isTame);
// try to access an undefined property
console.log("isGreedy: ", myCat.isGreedy);
// change value of properties
myCat.age = 2;
myCat.breed = "Norweigian Forest Cat";
myCat.color = "Sable";
myCat.isTame = true;
// after changes
console.log(myCat);
console.log("name: ", myCat.name);
console.log("age: ", myCat.age);
console.log("is alive: ",myCat.isAlive);
console.log("breed: ",myCat.breed);
console.log("color: ", myCat.color);
console.log("isTame: ", myCat.isTame);
// add new properties
myCat["isGreedy"] = true;
myCat["weight"] = "4 lbs";
// after adding new properties
console.log(myCat);
console.log("name: ", myCat.name);
console.log("age: ", myCat.age);
console.log("is alive: ",myCat.isAlive);
console.log("breed: ",myCat.breed);
console.log("color: ", myCat.color);
console.log("isTame: ", myCat.isTame);
console.log("isGreedy: ", myCat.isGreedy);
console.log("weight: ", myCat.weight);
