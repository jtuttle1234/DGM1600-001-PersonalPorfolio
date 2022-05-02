import { starships } from '../data/starships.js';
import { removeChildren, getLastNumber } from '../utils/index.js';

const nav = document.querySelector('.nav')
const navList = document.querySelector('.navList')
const shipViewer = document.querySelector('.shipViewer')

const modal = document.querySelector('.modal')
const closeButton = document.querySelector('.modal-close')
const shipMessage = document.querySelector('.shipMessage')

closeButton.addEventListener('click', () => {
    modal.classList.toggle('is-active')
})

function populateNav() {
    starships.forEach((starship) => {
        let anchor = document.createElement('a')
        anchor.href = '#'
        anchor.textContent = starship.name
        const listItem = document.createElement('li')
        

        anchor.addEventListener('click', () => populateShipView(starship))
        
        listItem.appendChild(anchor)
        navList.appendChild(listItem)
        
    
    })
}

populateNav()

function populateShipView (shipData) {
 removeChildren(shipViewer)
 const shipFig = document.createElement("figure")
 const figImg = document.createElement("img")
 const figCaption = document.createElement("figcaption")
 let shipNum = getLastNumber(shipData.url)
figImg.src = `https://starwars-visualguide.com/assets/img/starships/${shipNum}.jpg`;
figCaption.textContent =  `Ship: ${shipData.name}` ;
 
shipFig.appendChild(figImg);
shipFig.appendChild(figCaption);
shipViewer.appendChild(shipFig);


 

 figImg.addEventListener('error', () => {
     console.log('we got an error')
     figImg.hidden = true;
     modal.classList.toggle('is-active')
     shipMessage.textContent = `The ship known as as "${shipData.name}", is in for repairs.`
 } )

//  shipViewer.appendChild(figImg)
}

// function populateShipView(shipData) {
//     removeChildren(shipViewer)
  
//     const shipImage = document.createElement('img')
//     let shipNum = getLastNumber(shipData.url)
//     shipImage.src = `https://starwars-visualguide.com/assets/img/starships/${shipNum}.jpg`
//     shipImage.addEventListener('error', () => {
//       console.log("Image error!!!!!!")
//       shipImage.hidden = true
//       shipMessage.textContent = `The ship known as ${shipData.name} is currently in space port for repairs.`
//       modal.classList.toggle('is-active')
//     })
  
//     shipViewer.appendChild(shipImage)
  
//   }