import { getLastNumber } from "../utils/index.js";
import { removeChildren } from "../utils/index.js";

const getAPIData = async (url) => {
  try {
    const result = await fetch(url);
    return await result.json();
  } catch (error) {
    console.error(error);
  }
};

const loadedPokemon = [];

async function loadPokemon(offset = 0, limit = 40) {
  const pokeData = await getAPIData(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}  `
  );
  for (const nameAndUrl of pokeData.results) {
    const pokemon = await getAPIData(nameAndUrl.url);
    const simplifiedPokemon = {
      id: pokemon.id,
      height: pokemon.height,
      weight: pokemon.weight,
      name: pokemon.name,
      types: pokemon.types,
      abilities: pokemon.abilities,
      moves: pokemon.moves.slice(0, 3),
    };
    loadedPokemon.push(simplifiedPokemon);
    populatePokeCard(simplifiedPokemon);
  }
}

class Pokemon {
  constructor(name, height, weight, abilities, types, moves) {
    this.id = 9001;
    (this.name = name),
      (this.height = height),
      (this.weight = weight),
      (this.abilities = abilities),
      (this.types = types);
      (this.moves = moves);
  }
}

const headers = document.querySelector('header')
const loadButton = document.createElement('button')
loadButton.textContent = 'Load Pokemon'
headers.appendChild(loadButton)
loadButton.addEventListener('click', async () => {
  if (loadedPokemon.length === 0) {
    removeChildren(pokeGrid)
    await loadPokemon(0, 50)
  }
})


const newButton = document.createElement('button')
newButton.textContent = 'New Pokemon'
headers.appendChild(newButton)
newButton.addEventListener('click', () => {
  const pokeName = prompt('What is the name of your new Pokemon?', 'Enter Name Here')
  const pokeHeight = prompt("What is the Pokemon's height?", 20)
  const pokeWeight = prompt("What is the Pokemon's weight?", 1000)
  const pokeAbilities = prompt(
    "What are your Pokemon's abilities? (use a comman-separated list)",
  )
  const pokeTypes = prompt(
    "What are your Pokemon's types? (up to 2 types separated by a space)",
  )
  const pokeMoves = prompt(
    "What are your Pokemon's moves? (up to 3 moves seperated by a space)"
  )
  
  const newPokemon = new Pokemon(
    pokeName,
    pokeHeight,
    pokeWeight,
    makeAbilitiesArray(pokeAbilities),
    makeTypesArray(pokeTypes),
    makeMovesArray(pokeMoves),
  )
  
  populatePokeCard(newPokemon)

})

function makeAbilitiesArray(commaString) {
  return commaString.split(",").map((abilityName) => {
    return {
      ability: { name: abilityName },
    };
  });
}

function makeTypesArray(spacedString) {
  return spacedString.split(" ").map((typeName) => {
    return {
      type: { name: typeName },
    };
  });
}

function makeMovesArray(commaString2) {
  return commaString2.split(" ").map((moveName) => {
    return {
      move: { name: moveName}
    }
  })
}

const pokeGrid = document.querySelector(".pokeGrid");



function populatePokeCard(pokemon) {
  const pokeScene = document.createElement("div");
  pokeScene.className = "scene";
  const pokeCard = document.createElement("div");
  pokeCard.className = "card";
  pokeCard.addEventListener("click", () =>
    pokeCard.classList.toggle("is-flipped")
  );

  pokeCard.appendChild(populateCardFront(pokemon));
  pokeCard.appendChild(populateCardBack(pokemon));
  pokeScene.appendChild(pokeCard);
  pokeGrid.appendChild(pokeScene);
}

function populateCardFront(pokemon) {
  const pokeFront = document.createElement("figure");
  pokeFront.className = "cardFace front";

  const pokeType1 = pokemon.types[0].type.name;
  getPokeTypeColor(pokeType1);
  pokeFront.style.setProperty("background", getPokeTypeColor(pokeType1));

  const pokeImg = document.createElement("img");
  if (pokemon.id > 9000) {
    // load local image
    pokeImg.src = "../images/pokeball.png";
  } else {
    pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  }

  const pokeCaption = document.createElement("figcaption");
  pokeCaption.textContent = pokemon.name;

  pokeFront.appendChild(pokeImg);
  pokeFront.appendChild(pokeCaption);
  return pokeFront;
}

function populateCardBack(pokemon) {
  const pokeBack = document.createElement("div");
  pokeBack.className = "cardFace back";

  

///// ABILITY LIST AREA //////
  const label = document.createElement("h4");
  label.textContent = "Abilities";
  pokeBack.appendChild(label);
  const abilityList = document.createElement("ul");
  pokemon.abilities.forEach((abilityItem) => {
    const listItem = document.createElement("li");
    listItem.textContent = abilityItem.ability.name;
    abilityList.appendChild(listItem);
  });
  pokeBack.appendChild(abilityList)
//////// TYPE LIST AREA ///////
const typeLabel = document.createElement("h4")
  typeLabel.textContent = "Types";
  pokeBack.appendChild(typeLabel)
 const typeList = document.createElement("ul")
  pokemon.types.forEach((typeItem) => {
    const typeListItem = document.createElement("li")
      typeListItem.textContent = typeItem.type.name;
      typeList.appendChild(typeListItem)
  });
  pokeBack.appendChild(typeList)
  ;
  ///////MOVES LIST AREA////////////////////////////
  const movesLabel = document.createElement("h4")
  movesLabel.textContent = "Moves"
  pokeBack.appendChild(movesLabel);
  const moveList = document.createElement("ul")
  pokemon.moves.forEach ((moveItem) => {
    const moveListItem = document.createElement("li")
      moveListItem.textContent = moveItem.move.name;
      moveList.appendChild(moveListItem)
  });
  pokeBack.appendChild(moveList);



  const pokeBackBorder = document.createElement("figure");
  const pokeType2 = pokemon.types[0].type.name;
  getPokeTypeColor(pokeType2);
  pokeBack.style.setProperty("color", getPokeTypeColor(pokeType2));
  return pokeBack;
}

function getPokeTypeColor(pokeTypes) {
  let color;
  switch (pokeTypes) {
    case "grass":
      color = "#7AC74C";
      break;
      case "fire":
      color = "#EE8130";
      break;
      case "water":
      color = "#6390F0";
      break;
      case "normal":
      color = "#A8A77A";
      break;
      case "poison":
      color = "#A33EA1";
      break;
      case "electric":
      color = "#F7D02C";
      break;
      case "ground":
      color = "#E2BF65";
      break;
      case "fairy":
      color = "#D685AD";
      break;
      case "bug":
      color = "#A6B91A";
      break;
      case "fighting":
      color = "#C22E28";
      break;
      case "psychic":
      color = "#F95587";
      break;
      case "rock":
      color = "#B6A136";
      break;
      case "ghost":
      color = "#735797";
      break;
      case "ice":
      color = "#96D9D6";
      break;
      case "dragon":
      color = "#6F35FC";
      break;
      case "dark":
      color = "#705746";
      break;
     

  }
  return color;
}



function getPokemonByType(type) {
  return loadedPokemon.filter((pokemon) => pokemon.types[0].type.name === type)
}
// now figure out how to display this count in the UI
const typeSelector = document.querySelector('#type-select')
typeSelector.addEventListener('change', (event) => {
  removeChildren(pokeGrid) // cleared out the grid from all pokemon
  const usersTypeChoice = event.target.value.toLowerCase()
  if (event.target.value === 'Show All Pokemon') {
    loadedPokemon.forEach((singleLoadedPokemon) =>
      populatePokeCard(singleLoadedPokemon),
    )
  } else {
    const pokemonByType = getPokemonByType(usersTypeChoice)
    // now just loop through the filtered array and populate
    pokemonByType.forEach((eachSinglePokemon) =>
      populatePokeCard(eachSinglePokemon),
    )
  }
})
