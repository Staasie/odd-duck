'use strict';

const productNames = ['boots', 'bathroom', 'breakfast', 'bubblegum', 'chair', 'dog-duck', 'tauntaun', 'scissors', 'water-can', 'wine-glass', 'bag', 'banana', 'cthulhu', 'dragon', 'pen', 'pet-sweep', 'shark', 'sweep', 'unicorn'];

// State object holds the holds the current state of the application (all existing Products)
const state = {
  allProducts: [],
};

function Product(name, path) {
  this.name = name;
  this.path = path;
  this.tally = 0;
  this.views = 0;
}

(function buildAlbum() {
  for (let i = 0; i < productNames.length; i++) {
    let product = new Product(productNames[i], 'imgs/' + productNames[i] + '.jpg');
    state.allProducts.push(product);
  }
})();

const productRank = {
  totalClicks: 0,
  voteRounds: 25,
  leftObj: null,
  midObj: null,
  rightObj: null,

  leftEl: document.getElementById('img1'),
  midEl: document.getElementById('img2'),
  rightEl: document.getElementById('img3'),
  imageEls: document.getElementById('images'),
  resultsEl: document.getElementById('results'),
  resultsButton: document.getElementById('showResults'),
  resetButton: document.getElementById('reset'),

  getRandomIndex: function () {
    return Math.floor(Math.random() * productNames.length);
  },

  displayImages: function () {
    productRank.leftObj = state.allProducts[productRank.getRandomIndex()];
    productRank.midObj = state.allProducts[productRank.getRandomIndex()];
    productRank.rightObj = state.allProducts[productRank.getRandomIndex()];

    if (productRank.leftObj === productRank.midObj || productRank.leftObj === productRank.rightObj || productRank.midObj === productRank.rightObj) {
      productRank.displayImages();
    }

    productRank.leftObj.views += 1;
    productRank.midObj.views += 1;
    productRank.rightObj.views += 1;

    productRank.leftEl.src = productRank.leftObj.path;
    productRank.leftEl.id = productRank.leftObj.name;

    productRank.midEl.src = productRank.midObj.path;
    productRank.midEl.id = productRank.midObj.name;

    productRank.rightEl.src = productRank.rightObj.path;
    productRank.rightEl.id = productRank.rightObj.name;
  },

  tallyClicks: function (elId) {
    for (const i in state.allProducts) {
      if (state.allProducts[i].name === elId) {
        state.allProducts[i].tally += 1;
        this.totalClicks += 1;
        console.log(state.allProducts[i].name + ' has ' + state.allProducts[i].tally + ' votes');
      }
    }
  },

  displayResults: function () {
    const ulEl = document.createElement('ul');
    for (const i in state.allProducts) {
      const liElOne = document.createElement('li');
      const str = state.allProducts[i].name + ' has ' + state.allProducts[i].tally + ' votes.';
      liElOne.textContent = (str);
      ulEl.appendChild(liElOne);
    }
    const liElTwo = document.createElement('li');
    liElTwo.textContent = 'Total User Clicks: ' + productRank.totalClicks;
    ulEl.appendChild(liElTwo);
    this.resultsEl.appendChild(ulEl);
  },

  showButton: function () {
    this.resultsButton.hidden = false;
    this.resultsButton.addEventListener('click', function () {
      productRank.resetButton.hidden = false;
      productRank.resultsButton.hidden = true;
      productRank.displayResults();

      productRank.resetButton.addEventListener('click', function () {
        productRank.resetButton.hidden = true;
        location.reload();
      });
    });
  },

  onClick: function (event) {
    if (event.target.id === productRank.leftObj.name || event.target.id === productRank.midObj.name || event.target.id === productRank.rightObj.name) {
      productRank.tallyClicks(event.target.id);

      if (productRank.totalClicks % productRank.voteRounds === 0) {
        productRank.imageEls.removeEventListener('click', productRank.onClick);
        productRank.showButton();
      }
      productRank.displayImages();
    } else {
      alert('Click the image please!');
    }
  }
};

productRank.imageEls.addEventListener('click', productRank.onClick);
productRank.displayImages();






























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
