import { senators } from "../data/senators.js";
import { representatives } from "../data/representatives.js";
import { removeChildren } from "../utils/index.js";

const allCongressMembers = [...senators, ...representatives] //modern way to combine arrays. like a genius

const senatorDiv = document.querySelector(".senatorsDiv");
const seniorityHeading = document.querySelector(".seniority");
const loyaltyList = document.querySelector(".loyaltyList");
const header = document.querySelector("header")
function simplifiedSenators() {
  return senators.map((senator) => {
    const middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `;
    return {
      id: senator.id,
      name: `${senator.first_name}${middleName}${senator.last_name}`,
      party: senator.party,
      gender: senator.gender,
      imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`,
      seniority: +senator.seniority,
      missedVotesPct: senator.missed_votes_pct,
      loyaltyPct: senator.votes_with_party_pct,
    };
  });
}



const simpleSenators = simplifiedSenators();

function populateSenatorDiv(simpleSenators) {
 removeChildren(senatorDiv)
  simpleSenators.forEach((senator) => {
    const senFigure = document.createElement("figure");
    const figImg = document.createElement("img");
    const figCaption = document.createElement("figcaption");

    figImg.src = senator.imgURL;
    figCaption.textContent = senator.name, senator.party;
    
    senFigure.appendChild(figImg);
    senFigure.appendChild(figCaption);
    senatorDiv.appendChild(senFigure);
  });
}



// simpleSenators.forEach...
//create figure and figcaption elements
// set the image src to the senators imgURL
// append them to the DOM

const mostSeniorMember = simplifiedSenators().reduce((acc, senator) => {
  return acc.seniority > senator.seniority ? acc : senator;
});

seniorityHeading.textContent = `The most Senior Member of the Senate is ${mostSeniorMember.name}`;




simplifiedSenators().forEach((senator) => {
  if (senator.loyaltyPct === 100) {
    let listItem = document.createElement("li");
    listItem.textContent = senator.name;
    loyaltyList.appendChild(listItem);
  }
});

const biggestMissedVotesPct = simplifiedSenators().reduce((acc, senator) =>
  acc.missedVotesPct > senator.missedVotesPct ? acc : senator
);

const biggestVacationerList = simplifiedSenators().filter(
  (senator) => senator.missedVotesPct === biggestMissedVotesPct.missedVotesPct
).map(senator => senator.name).join(' and ');

const femaleSenators = simpleSenators.filter((senator) => {

  if (senator.gender === "F") {
    return senator;
  }
})

const repulicans = simpleSenators.filter((senator) => {

  if (senator.party === "R") {
    return senator;
  }
})

const democrats = simpleSenators.filter((senator) => {

  if (senator.party === "D") {
    return senator;
  }
})

const maleSenator = simpleSenators.filter((senator) => {

  if (senator.gender === "M") {
    return senator;
  }
})

//all header buttons

const femaleSenatorsButton = document.createElement('button')
femaleSenatorsButton.textContent = "Female Senators";
femaleSenatorsButton.addEventListener("click", () => populateSenatorDiv(femaleSenators))
const maleSenatorsButton = document.createElement('button')
maleSenatorsButton.textContent = "Male Senators"
maleSenatorsButton.addEventListener("click", () => populateSenatorDiv(maleSenator))
const allSenatorsButton = document.createElement('button')
allSenatorsButton.textContent = "All Senators";
allSenatorsButton.addEventListener('click', () => populateSenatorDiv(simpleSenators))
const republicanButton = document.createElement('button')
republicanButton.textContent = "Republicans"
republicanButton.addEventListener('click', () => populateSenatorDiv(repulicans))
const democratsButton = document.createElement('button')
democratsButton.textContent = "Democrats"
democratsButton.addEventListener('click', () => populateSenatorDiv(democrats))


header.appendChild(allSenatorsButton);
header.appendChild(femaleSenatorsButton);
header.appendChild(maleSenatorsButton);
header.appendChild(republicanButton);
header.appendChild(democratsButton)

populateSenatorDiv(simpleSenators);