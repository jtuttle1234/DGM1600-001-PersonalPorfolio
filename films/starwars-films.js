import { films } from '../data/films.js'


function getLastNumber(url) {
    // 'https://swapi.co/api/films/1/
    const secondToLastLetter = url[url.length - 2]
    return secondToLastLetter // just the number that comes before the last forward slash
}

console.log(getLastNumber('https://swapi.co/api/films/1/'))

console.log('Hello Console!')

//Third, use a variable to store a reference to the main element with an id attribute of filmlist
let filmList = document.querySelector('#filmList')


for (let i = 0; i < films.length; i++) {
    console.log(films[i].url);

    // First , create img element
    let figure = document.createElement('figure')
    let figImage = document.createElement('img')
    let figCaption = document.createElement('figcaption')
    // Second, set the new image source property to a valid url or path
    let fimlNum = getLastNumber(films[i].url)

    figImage.src = `https://starwars-visualguide.com/assets/img/films/${fimlNum}.jpg`

    figCaption.textContent = films[i].title


    //fourth, append the newly created img element as a child of the main element to make it appear in the DOM.
    figure.appendChild(figImage)
    figure.appendChild(figCaption)
    filmList.appendChild(figure)

}