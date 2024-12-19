'use strict';


// State object holds the current state of the application, specifically all product objects.

const state = {

  allProducts: [],

};


// Array of product names used to generate product objects.

const productNames = ['boots', 'bathroom', 'breakfast', 'bubblegum', 'chair', 'dog-duck', 'tauntaun', 'scissors', 'water-can', 'wine-glass', 'bag', 'banana', 'cthulhu', 'dragon', 'pen', 'pet-sweep', 'shark', 'sweep', 'unicorn'];


// Constructor function to create product objects with name, image path, tally of votes, and view count.

function Product(name, path) {

  this.name = name;

  this.path = path;

  this.tally = 0; // Number of votes received by this product.

  this.views = 0; // Number of times this product was displayed to the user.

}


// Immediately Invoked Function Expression (IIFE) to build the initial array of product objects.

(function buildAlbum() {

  for (let i = 0; i < productNames.length; i++) {

    let product = new Product(productNames[i], 'imgs/' + productNames[i] + '.jpg');

    state.allProducts.push(product);//pushes the products from out imgs folder to the current array

  }

})();



// Object to manage product ranking logic and UI interactions.

const productRank = {

  totalClicks: 0, // Tracks total user clicks across all displayed products.

  voteRounds: 25, // Number of rounds allowed before showing results.

  leftObj: null, // Product object for the left image.

  midObj: null, // Product object for the middle image.

  rightObj: null, // Product object for the right image.


  // DOM elements for interacting with the UI.

  leftEl: document.getElementById('img1'),

  midEl: document.getElementById('img2'),

  rightEl: document.getElementById('img3'),

  imageEls: document.getElementById('images'),

  resultsEl: document.getElementById('results'),

  resultsButton: document.getElementById('showResults'),

  resetButton: document.getElementById('reset'),


  // Generates a random index within the product names array.

  getRandomIndex: function () {

    return Math.floor(Math.random() * productNames.length);//math.floor rounds number down, 19x0.8=15.2 ~15

  },


  // Displays three random product images while ensuring no duplicates.

  displayImages: function () {

    productRank.leftObj = state.allProducts[productRank.getRandomIndex()];//15 = pen//looking back at productRank.leftObj, find out what is the "state": []; 15 ? is out pen pic;

    productRank.midObj = state.allProducts[productRank.getRandomIndex()];

    productRank.rightObj = state.allProducts[productRank.getRandomIndex()];


    // Ensures unique products are shown.

    if (productRank.leftObj === productRank.midObj || productRank.leftObj === productRank.rightObj || productRank.midObj === productRank.rightObj) {

      productRank.displayImages(); //so if left is strcitly equal mid, left = right or mid equal right , then we will display differetn images

    }


    // Increment the view count for each displayed product.

    productRank.leftObj.views += 1;//round 5, our image 1 at leftobj has 3 views from round 4 ; now 3 views + 1 = 4

    productRank.midObj.views += 1;

    productRank.rightObj.views += 1;


    // Update image sources and IDs for click handling.

    productRank.leftEl.src = productRank.leftObj.path;

    productRank.leftEl.id = productRank.leftObj.name;


    productRank.midEl.src = productRank.midObj.path;

    productRank.midEl.id = productRank.midObj.name;


    productRank.rightEl.src = productRank.rightObj.path;

    productRank.rightEl.id = productRank.rightObj.name;

  },


  // Tally votes for the clicked product and increment total clicks.

  tallyClicks: function (elId) {

    for (const i in state.allProducts) {

      if (state.allProducts[i].name === elId) {

        state.allProducts[i].tally += 1; // Increment vote count for the clicked product.//2 + 1 = 3

        this.totalClicks += 1; // Increment total clicks count.

        console.log(state.allProducts[i].name + ' has ' + state.allProducts[i].tally + ' votes');

      }

    }

  },


  // Displays the voting results in a list format.

  displayResults: function () {

    const ulEl = document.createElement('ul');

    for (const i in state.allProducts) {

      const liElOne = document.createElement('li');

      const str = state.allProducts[i].name + ' has ' + state.allProducts[i].tally + ' votes.';

      liElOne.textContent = (str);//if this isnt here then they will not show on site

      ulEl.appendChild(liElOne);

    }

    const liElTwo = document.createElement('li');

    liElTwo.textContent = 'Total User Clicks: ' + productRank.totalClicks;

    ulEl.appendChild(liElTwo);

    this.resultsEl.appendChild(ulEl);

  },


  // Shows the results button and handles results display and reset functionality.

  showButton: function () {

    this.resultsButton.hidden = false;

    this.resultsButton.addEventListener('click', function () {

      productRank.resetButton.hidden = false;

      productRank.resultsButton.hidden = true;

      productRank.displayResults();


      productRank.resetButton.addEventListener('click', function () {

        productRank.resetButton.hidden = true;

        location.reload(); // Reloads the page to reset the application.

      });

    });

  },


  // Handles click events on product images.

  onClick: function (event) {

    if (event.target.id === productRank.leftObj.name || event.target.id === productRank.midObj.name || event.target.id === productRank.rightObj.name) {

      productRank.tallyClicks(event.target.id); // Tally the vote for the clicked product.


      // Check if the voting rounds are completed.

      if (productRank.totalClicks % productRank.voteRounds === 0) {// 24 % 25 = 

        productRank.imageEls.removeEventListener('click', productRank.onClick); // Stop listening for clicks.

        productRank.showButton(); // Show results button.

      }

      productRank.displayImages(); // Display the next set of images.

    } else {

      alert('Click the image please!'); // Alert user to click a valid image.

    }

  }

};


// Attach the click event listener to the images container.

productRank.imageEls.addEventListener('click', productRank.onClick);

// Display the initial set of images.

productRank.displayImages();








































// 'use strict';

// const productNames = ['boots', 'bathroom', 'breakfast', 'bubblegum', 'chair', 'dog-duck', 'tauntaun', 'scissors', 'water-can', 'wine-glass', 'bag', 'banana', 'cthulhu', 'dragon', 'pen', 'pet-sweep', 'shark', 'sweep', 'unicorn'];

// // State object holds the holds the current state of the application (all existing Products)
// const state = {
//   allProducts: [],
// };

// function Product(name, path) {
//   this.name = name;
//   this.path = path;
//   this.tally = 0;
//   this.views = 0;
// }

// (function buildAlbum() {
//   for (let i = 0; i < productNames.length; i++) {
//     let product = new Product(productNames[i], 'imgs/' + productNames[i] + '.jpg');
//     state.allProducts.push(product);
//   }
// })();

// const productRank = {
//   totalClicks: 0,
//   voteRounds: 25,
//   leftObj: null,
//   midObj: null,
//   rightObj: null,

//   leftEl: document.getElementById('img1'),
//   midEl: document.getElementById('img2'),
//   rightEl: document.getElementById('img3'),
//   imageEls: document.getElementById('images'),
//   resultsEl: document.getElementById('results'),
//   resultsButton: document.getElementById('showResults'),
//   resetButton: document.getElementById('reset'),

//   getRandomIndex: function () {
//     return Math.floor(Math.random() * productNames.length);
//   },

//   displayImages: function () {
//     productRank.leftObj = state.allProducts[productRank.getRandomIndex()];
//     productRank.midObj = state.allProducts[productRank.getRandomIndex()];
//     productRank.rightObj = state.allProducts[productRank.getRandomIndex()];

//     if (productRank.leftObj === productRank.midObj || productRank.leftObj === productRank.rightObj || productRank.midObj === productRank.rightObj) {
//       productRank.displayImages();
//     }

//     productRank.leftObj.views += 1;
//     productRank.midObj.views += 1;
//     productRank.rightObj.views += 1;

//     productRank.leftEl.src = productRank.leftObj.path;
//     productRank.leftEl.id = productRank.leftObj.name;

//     productRank.midEl.src = productRank.midObj.path;
//     productRank.midEl.id = productRank.midObj.name;

//     productRank.rightEl.src = productRank.rightObj.path;
//     productRank.rightEl.id = productRank.rightObj.name;
//   },

//   tallyClicks: function (elId) {
//     for (const i in state.allProducts) {
//       if (state.allProducts[i].name === elId) {
//         state.allProducts[i].tally += 1;
//         this.totalClicks += 1;
//         console.log(state.allProducts[i].name + ' has ' + state.allProducts[i].tally + ' votes');
//       }
//     }
//   },

//   displayResults: function () {
//     const ulEl = document.createElement('ul');
//     for (const i in state.allProducts) {
//       const liElOne = document.createElement('li');
//       const str = state.allProducts[i].name + ' has ' + state.allProducts[i].tally + ' votes.';
//       liElOne.textContent = (str);
//       ulEl.appendChild(liElOne);
//     }
//     const liElTwo = document.createElement('li');
//     liElTwo.textContent = 'Total User Clicks: ' + productRank.totalClicks;
//     ulEl.appendChild(liElTwo);
//     this.resultsEl.appendChild(ulEl);
//   },

//   showButton: function () {
//     this.resultsButton.hidden = false;
//     this.resultsButton.addEventListener('click', function () {
//       productRank.resetButton.hidden = false;
//       productRank.resultsButton.hidden = true;
//       productRank.displayResults();

//       productRank.resetButton.addEventListener('click', function () {
//         productRank.resetButton.hidden = true;
//         location.reload();
//       });
//     });
//   },

//   onClick: function (event) {
//     if (event.target.id === productRank.leftObj.name || event.target.id === productRank.midObj.name || event.target.id === productRank.rightObj.name) {
//       productRank.tallyClicks(event.target.id);

//       if (productRank.totalClicks % productRank.voteRounds === 0) {
//         productRank.imageEls.removeEventListener('click', productRank.onClick);
//         productRank.showButton();
//       }
//       productRank.displayImages();
//     } else {
//       alert('Click the image please!');
//     }
//   }
// };

// productRank.imageEls.addEventListener('click', productRank.onClick);
// productRank.displayImages();






























// 'use strict';

// const products = ["Bag", "banana", "bathroom,boots", "breakfast", "bubblegum", "Chair", "cthulhu", "dog-duck", "dragon", "pen", "pet-sweep", "scissors", "Shark", "sweep", "tauntaun", "unicorn", "water-can", "wine-glass"];

// function Product(name, filePath) {
//     this.name = name;
//     this.filePath = filePath;
//     this.timesShown = 0;
//     this.timesClicked = 0;
//     products.push(this);
// }
// // dup ones--v
// // new Product('banana', './images/banana.jpg');
// // new Product('dog-duck', './images/dog-duck.jpg');

// let totalRounds = 25;
// let currentRound = 0;

// const productContainer = document.getElementById('product-container');
// const viewResultsBtn = document.getElementById('view-results');
// const resultsChart = document.getElementById('results-chart');

// function getRandomProducts() {
//     const indexes = [];
//     while (indexes.length < 3) {
//         const randomIndex = Math.floor(Math.random() * products.length);
//         if (!indexes.includes(randomIndex)) indexes.push(randomIndex);
//     }
//     return indexes.map(index => products[index]);
// }

// function renderProducts() {
//     const displayedProducts = getRandomProducts();
//     const imgElements = productContainer.querySelectorAll('img');
//     displayedProducts.forEach((product, i) => {
//         const img = imgElements[i];
//         img.src = product.filePath;
//         img.alt = product.name;
//         product.timesShown++;
//     });
// }

// let bag = new Product('plastic suitcase bag', './imgfolder/bag.jpg');
// let banana = new Product('banana', './imgfolder/bag.jpg');
// let bathroom = new Product('bathroom', './imgfolder/bag.jpg');
// let boots = new Product('boots', './imgfolder/bag.jpg');
// let breakfast = new Product('breakfast', './imgfolder/bag.jpg');
// let bubblegum = new Product('bubblegum', './imgfolder/bag.jpg');
// let Chair = new Product('chair', './imgfolder/bag.jpg');
// let cthulhu = new Product('cthulhu', './imgfolder/bag.jpg');
// let dogduck = new Product('dog-duck', './imgfolder/bag.jpg');
// let dragon = new Product('dragon', './imgfolder/bag.jpg');
// let pen = new Product('pen', './imgfolder/bag.jpg');
// let petsweep = new Product('petsweep', './imgfolder/bag.jpg');
// let scissors = new Product('scissors', './imgfolder/bag.jpg');
// let tauntaun = new Product('tauntaun', './imgfolder/bag.jpg');
// let unicorn = new Product('unicorn', './imgfolder/bag.jpg');
// let watercan = new Product('water-can', './imgfolder/bag.jpg');
// let wineglass = new Product('wine-glass', './imgfolder/bag.jpg');

// // renderProducts()

// function handleClick(event) {
//     if (event.target.tagName !== 'IMG') return;
//     const clickedProduct = products.find(p => p.filePath === event.target.src);
//     clickedProduct.timesClicked++;
//     currentRound++;
//     if (currentRound < totalRounds) {
//         renderProducts();
//     } else {
//         productContainer.removeEventListener('click', handleClick);
//         viewResultsBtn.hidden = false;
//     }
// }

// function displayResults() {
//     const labels = products.map(p => p.name);
//     const votes = products.map(p => p.timesClicked);
//     const shown = products.map(p => p.timesShown);

//     resultsChart.hidden = false;
//     new chart(resultsChart, {
//         type: 'bar',
//         data: {
//             labels,
//             datasets: [
//                 { label: 'Votes', data: votes },
//                 { label: 'Times Shown', data: shown }
//             ]
//         }
//     });
// }

// productContainer.addEventListener('click', handleClick);
// viewResultsBtn.addEventListener('click', displayResults);

// renderProducts();
