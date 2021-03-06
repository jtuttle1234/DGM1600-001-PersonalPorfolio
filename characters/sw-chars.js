import { people } from "../data/people.js";
import { getLastNumber, removeChildren } from "../utils/index.js";

const header = document.querySelector("header");
const main = document.querySelector("main");

const allCharsButton = document.createElement("button");
allCharsButton.textContent = "All Characters";
allCharsButton.addEventListener("click", function (event) {
  console.log("Thanks for clicking!");
  populateDOM(people);
});

const maleCharacters = people.filter((person) => person.gender === "male");

// TODO: make a filter for female chars
// TODO: make a filter for female chars

const maleCharsButton = document.createElement("button");
maleCharsButton.textContent = "Male Characters";
maleCharsButton.addEventListener("click", () => populateDOM(maleCharacters));

const otherCharactersButton = document.createElement("button");
otherCharactersButton.textContent = "Other Characters";
otherCharactersButton.addEventListener("click", () =>
  populateDOM(otherCharacters)
);

// TODO: create a female chars button and add ot the dom
// TODO: create a other chars button and add ot the dom

const otherCharacters = people.filter((person) => {
  if (
    person.gender === "hermaphrodite" ||
    person.gender === "none" ||
    person.gender === "n/a"
  ) {
    return person;
  }
});

header.appendChild(otherCharactersButton);
header.appendChild(allCharsButton);
header.appendChild(maleCharsButton);

function populateDOM(characters) {
  //loop through all the characters and make figure elements and insert them into the DOM
  removeChildren(main);
  characters.forEach((person) => {
    const personFig = document.createElement("figure");
    const personImg = document.createElement("img");

    let charNum = getLastNumber(person.url);

    personImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`;
    const personCap = document.createElement("figcaption");
    personCap.textContent = person.name;

    personFig.appendChild(personImg);
    personFig.appendChild(personCap);
    main.appendChild(personFig);
  });
}

populateDOM(people);
