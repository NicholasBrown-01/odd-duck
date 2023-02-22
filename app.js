'use strict';


// * GLOBALS * //

let productArray = [];
let votingRounds = 25;


// * DOM WINDOWS * //

let imgContainers = document.getElementById('image-containers');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsBtn = document.getElementById('results-btn');

// *** CANVAS ELEMENT FOR CHART *** //
let ctx = document.getElementById('my-chart');



// * CONSTRUCTOR FUNCTIONS * //

function Product(name, fileExtension = 'jpg'){
  this.name = name;
  this.image = `img/${name}.${fileExtension}`;
  this.votes = 0;
  this.shown = 0;
}

let indexArray = [];

// * HELPER FUNCTIONS & UTILITIES * //

function renderImages() {

  while(indexArray.length < 6) {
    let randomNumber = randomImageIndex();
    if(!indexArray.includes(randomNumber)) {
      indexArray.push(randomNumber);
    }
  }
  console.log(indexArray);

  let imgOneIndex = indexArray.splice(0, 1);
  let imgTwoIndex = indexArray.splice(0, 1);
  let imgThreeIndex = indexArray.splice(0, 1);

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

// *** HELPER FUNCTION TO RENDER CHART *** //
function renderChart() {
  let productNames = [];
  let productVotes = [];
  let productShown = [];

  for (let i = 0; i < productArray.length; i++) {
    productNames.push(productArray[i].name);
    productVotes.push(productArray[i].votes);
    productShown.push(productArray[i].shown);
  }

  let chartObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: productVotes,
        borderWidth: 1
      },
      {
        label: '# of times Shown',
        data: productShown,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  // *** 2 args for the Chart Constructor - canvas element, config obj with goat data
  new Chart(ctx, chartObj); //eslint-disable-line
}


// TODO: IDENTIFY IMAGE THAT WAS CLICKED
function handleImageClick(event) {
  let imgClicked = event.target.title;
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
    alert('Voting is now over, please click the "Show Results" button under the images.');

    // * LOCAL STORAGE STARTS HERE *
    // ? Step 1: Convert data to a string for local storage

    let stringifiedProductArray = JSON.stringify(productArray);

    // ? Step 2: Set Stringified Product Array to Local Storage
    localStorage.setItem('productArray', stringifiedProductArray);
  }
}

// TODO: STOP THE ABILITY TO KEEP CLICKING AFTER VOTING ROUNDS ARE OVER AND GIVE RESULTS
function renderResults() {
  if(votingRounds === 0) {

    renderChart();
    resultsBtn.removeEventListener('click', renderResults);
  }
}

// * LOCAL STORAGE ADDITIONAL *
// ? Step 3: Get Information from Local Storage
let retrievedProductArray = localStorage.getItem('productArray');

// ? Step 4: Convert back to usable code
let parsedProductArray = JSON.parse(retrievedProductArray);

console.log(parsedProductArray);

// * REBUILD THE PRODUCT ARRAY * //

if (retrievedProductArray) {
  productArray = parsedProductArray;
} else {

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
}

renderImages();

imgContainers.addEventListener('click', handleImageClick);
resultsBtn.addEventListener('click', renderResults);
