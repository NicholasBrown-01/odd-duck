'use strict';


// * GLOBALS * //

let productArray = [];
let votingRounds = 15;


// * DOM WINDOWS * //

let imgContainers = document.getElementById('image-containers');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsBtn = document.getElementById('results-btn');
let resultsList = document.getElementById('results-container');



// * CONSTRUCTOR FUNCTIONS * //

function Product(name, fileExtension = 'jpg'){
  this.name = name;
  this.image = `img/${name}.${fileExtension}`;
  this.votes = 0;
  this.shown = 0;
}



// * HELPER FUNCTIONS & UTILITIES * //

function renderImages() {
  // TODO: 3 IMAGES ON THE PAGE
  let imgOneIndex = randomImageIndex();
  let imgTwoIndex = randomImageIndex();
  let imgThreeIndex = randomImageIndex();
  // TODO: MAKE IMAGES UNIQUE
  while (imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex) {
    imgOneIndex = randomImageIndex();
    imgTwoIndex = randomImageIndex();
    imgThreeIndex = randomImageIndex();
  }

  imgOne.src = productArray[imgOneIndex].image;
  imgOne.title = productArray[imgOneIndex].name;
  imgOne.alt = `this is an image of ${productArray[imgOneIndex].name}`;

  imgTwo.src = productArray[imgTwoIndex].image;
  imgTwo.title = productArray[imgTwoIndex].name;
  imgTwo.alt = `this is an image of ${productArray[imgTwoIndex].name}`;

  imgThree.src = productArray[imgThreeIndex].image;
  imgThree.title = productArray[imgThreeIndex].name;
  imgThree.alt = `this is an image of ${productArray[imgThreeIndex].name}`;

  // TODO: INCREASE VIEW ON IMAGES
  productArray[imgOneIndex].shown++;
  productArray[imgTwoIndex].shown++;
  productArray[imgThreeIndex].shown++;
}


function randomImageIndex() {
  return Math.floor(Math.random() * productArray.length);
}

// TODO: IDENTIFY IMAGE THAT WAS CLICKED
function handleImageClick(event) {
  let imgClicked = event.target.title;
  console.dir(imgClicked);
  // TODO: INCREASE NUMBER OF VOTES ON THAT IMAGE
  for (let i = 0; i < productArray.length; i++) {
    if (imgClicked === productArray[i].name) {
      productArray[i].votes++;
    }
  }
  // TODO: LIMIT VOTING ROUNDS TO 15
  votingRounds--;
  // TODO: Rerender of Imgs
  renderImages();

  if (votingRounds === 0) {
    imgContainers.removeEventListener('click', handleImageClick);
  }
}

function renderResults() {
  if(votingRounds === 0) {
    for (let i = 0; i < productArray.length; i++) {
      let productListItem = document.createElement('li');
      productListItem.textContent = `${productArray[i].name} had ${productArray[i].votes} votes and was shown ${productArray[i].shown} times.`;
      resultsList.appendChild(productListItem);
    }
    resultsBtn.removeEventListener('click', renderResults);
  }
}



// TODO: STOP THE ABILITY TO KEEP CLICKING AFTER VOTING ROUNDS ARE OVER



// * EXECUTABLE CODE * //


let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dogDuck = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let petSweep = new Product('pet-sweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let waterCan = new Product('water-can');
let wineGlass = new Product('wine-glass');
let sweep = new Product('sweep', 'png');

productArray.push(sweep, bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, tauntaun, unicorn, waterCan, wineGlass);

renderImages();

imgContainers.addEventListener('click', handleImageClick);
resultsBtn.addEventListener('click', renderResults);