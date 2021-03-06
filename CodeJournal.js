// Variables - containers that store values

var name; // a declared variable but not initialized ( no value) and its in the "global scope" (bad)

let foo; // a declared es6 variable which can be changed - still no value however

const bar = "Bar"; // a declared ES 6 constant that cannot be changed
// '=' is the assingment operator, read it as "is assinged the value of..."

const ANSWER = 42;

// Strings - a set or string of characters

let string1 = "Hello World!";

let string2 = "Hello Utah!";

let string3 = new String("Hello New World!"); // using a string constructor

// Numbers

let myNum = 1738957432;

let myNum2 = 75.25;

("1"); // is not a number! it is a string.
// "==" a loose equality check
"1" == 1; //evaluates to true because of the type of coercion and loose equality checking

"1" === 1; //false because this is strict equality checking

// Boolean

let myBool = false;

//need to look further into "truthy" and "falsy" values

// Arrays - hold sets of items of any data type

let myArray = []; //this is an empty array - notice the square brackets

//ordering     0    1      2       3      4
let myArray = [42, "Bob", myBool, ANSWER, true];

let secondElement = myArray2[1]; // retreive the item at the 1 or second position of the array

myArray.length; // the length property of an array is very handy

let lastItem = myArray2[myArray2.length - 1];

// Objects

let minObject = {}; //the most minimal object possible

let myCar = {
  //objects are made of properties which are key:value pairs
  make: "Chevrolet",
  color: "Green",
  year: "1964",
  vin: "123456789123456987",
};

myCar.numDoors = 4; //a new property can be simply added to an existing object using dot notation

const anotherObject = {
  //onjects can contain just about anything, including arrays, other objects, etc.
  wordz: ["foo", "bar", "baz"],
  car: {
    make: "McLaren",
    model: "720s",
  },
  awesomeness: true,
};

// Functions

function myFunction() {
  // this is a named function definition
  return "My Greeting to you is what I return to you!"; //deosnt do much only returns a string
}

function sumTwoThings(thingOne, thingTwo) {
  return thingOne + thingTwo;
}

//arrays using filter function

const rebels = pilots.filter((pilot) => pilot.faction === "Rebels");

const empire = pilots.filter((pilot) => {
  return pilot.faction === "empire";
});

// Array helper method 'map' example 


let filmURLs = ["chicken", "nuggest", "yes", "brotherchicken"];

const filmLengths = filmURLs.map((filmURL) => filmURL.length);

const filmPlusMore = filmURLs.map((filmURL) => {
  let filmObj = {
    url: filmURL,
    createdDate: Date.now(),
  };
  return filmObj;
});

const pilotNames = pilots.map(pilot => pilot.name) // new array just contains pilots names


// ternary operator syntax: condition ? exprIfTrue : expIfFalse

const totalYears = swpilots.reduce((acc, pilot) => acc + pilot.years, 0) // total years should === 82

const mostExpPilot = swpilots.reduce((oldest, pilot) => {
  return (oldest.years || 0) > pilot.years ? oldest : pilot
}, )
