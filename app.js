/**
 * @param {String} s String to process.
 * @returns A new string with first character in upper case.
 */
const capitalize = function(s) {
  if (s.length === 0) return '';
  if (s.length === 1) return s.charAt(0).toUpperCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const app = {
  cardsData: {},
  cardsSpriteColumns: 8,
  cardsSpriteRows: 3,

  drawBoard() {

    const addCard = (boardElem, characterKey) => {

      // DEBUG - Card details (on hover)
      const addDetails = (cardElem) => {
        const cardFrontDetailsElem = document.createElement('div');
        cardElem.appendChild(cardFrontDetailsElem);
        cardFrontDetailsElem.className = 'card-front-details';
        characterSpecs = app.cardsData.characters[characterKey]['specs'];
        for (spec of app.cardsData.specsDisplayOrder) {
          specsOptions = app.cardsData.specs[spec];
          const cardBackSpecLineElem = document.createElement('p');
          cardFrontDetailsElem.appendChild(cardBackSpecLineElem);
          // Details line
          cardBackSpecLineElem.innerText = `${capitalize(spec)} = `;
          // Checking that the character has the spec, otherwise give it a 0 value (default)
          const charSpecValue = characterSpecs.hasOwnProperty(spec) ? characterSpecs[spec] : 0;
          // Checking that the character's spec value is within the spec values range
          if (charSpecValue <= specsOptions.length) {  
            cardBackSpecLineElem.innerText += `${specsOptions[charSpecValue]}`;
          } else {
            cardBackSpecLineElem.innerText += 'UNKNOWN';
          }
        }
        // Show/hide cards details when hovering
        cardElem.addEventListener('mouseover', () => {
          cardFrontDetailsElem.style.display = 'block';
        })
        cardElem.addEventListener('mouseleave', () => {
          cardFrontDetailsElem.style.display = 'none';
        })
      }

      // Card container
      const cardElem = document.createElement('div');
      boardElem.appendChild(cardElem);
      cardElem.className = 'card-container';

      // Card image
      const cardFrontElem = document.createElement('div');
      cardElem.appendChild(cardFrontElem);
      cardFrontElem.className = 'card-front';
      [column, row] = app.cardsData.characters[characterKey]['spriteCoordinates'];
      cardFrontElem.style.backgroundPosition = `${100 * column / (app.cardsSpriteColumns - 1)}% ${100 * row / (app.cardsSpriteRows - 1 )}%`;
      
      // Card title
      const cardTitleElem = document.createElement('div');
      cardFrontElem.appendChild(cardTitleElem);
      cardTitleElem.className = 'card-front__title';
      cardTitleElem.innerText = capitalize(characterKey);
      
      // Card details (DEBUG)
      addDetails(cardFrontElem);
    }

    // Drawing the board
    // console.log(app.cardsData);
    const boardElem = document.getElementById('board');

    // Adding cards
    for (charKey in app.cardsData.characters) {
      addCard(boardElem, charKey);
    }
  },

  async init() {
    // Read cards data
    app.cardsData = await fetch("./data/cards.json").then(response => response.json());
    // Draw board
    app.drawBoard();
  }
}


document.addEventListener('DOMContentLoaded', app.init);
