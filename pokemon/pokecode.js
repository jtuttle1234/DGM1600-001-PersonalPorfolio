const getAPIData = async (url) => {
  try {
    const result = await fetch(url);
    return await result.json();
  } catch (error) {
    console.error(error);
  }
};

async function loadPokemon(offset = 0, limit = 25) {
  const pokeData = await getAPIData(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}  `
  );
  for (const nameAndUrl of pokeData.results) {
    const pokemon = await getAPIData(nameAndUrl.url);
    populatePokeCard(pokemon);
  }
}

class Pokemon {
  constructor(name, height, weight, abilities, types) {
    this.id = 9001;
    (this.name = name),
      (this.height = height),
      (this.weigh = weight),
      (this.abilities = abilities),
      (this.types = types);
  }
}

const newButton = document.createElement("button");
newButton.textContent = "NEW POKEMON";
const header = document.querySelector("header");
header.appendChild(newButton);
newButton.addEventListener("click", () => {


  const pokeName = prompt('what is the name of your new Pokemon?', 'Thoremon')
  const pokeHeight = prompt('what is the Pokemons height?', 20)
  const pokeWeight = prompt('what is the pokemons weight?', 1000)
  const pokeAbilities = prompt('what is the pokemons abilities? (use a comma-seperated list')
  const pokeTypes = prompt('What are your Pokemons types? (up to 2 types seperated by a space)')


  const newPokemon = new Pokemon(
    pokeName,
    pokeHeight,
    pokeWeight,
    makeAbilitiesArray(pokeAbilities),
    makeTypesArray(pokeTypes)
  );
  console.log(newPokemon);
populatePokeCard(newPokemon)
});


function makeAbilitiesArray(commaString) {
  return commaString.split(',').map((abilityName) => {
    return {
      ability: { name: abilityName}
    }
  })
}

function makeTypesArray(spacedString) {
  return spacedString.split(' ').map((typeName) => {
    return {
      type: { name: typeName}
    }
  })
}




const pokeGrid = document.querySelector(".pokeGrid");

// function populatePokeGrid(pokemonArray) {
//  // loop through all the pokemon and create individual pokeCards
//  console.log(pokemonArray.results)
// }

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
  const label = document.createElement("h4");
  label.textContent = "Abilities";
  pokeBack.appendChild(label);
  const abilityList = document.createElement("ul");
  pokemon.abilities.forEach((abilityItem) => {
    const listItem = document.createElement("li");
    listItem.textContent = abilityItem.ability.name;
    abilityList.appendChild(listItem);
  });

  pokeBack.appendChild(abilityList);
  return pokeBack;
}

loadPokemon();
