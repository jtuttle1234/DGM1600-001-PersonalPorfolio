console.log('Hello Console!')

let newImage = document.createElement('img')

newImage.src = 'https://starwars-visualguide.com/assets/img/films/6.jpg'

let filmList = document.querySelector('#filmList')

filmList.appendChild(newImage)