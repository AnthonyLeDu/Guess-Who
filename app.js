const app = {
  cardsData: {},
  cardsSpriteColumns: 8,
  cardsSpriteRows: 3,

  drawBoard() {

    const addCard = (board, characterKey) => {
      charName = characterKey.charAt(0).toUpperCase() + characterKey.slice(1);
      [column, row] = app.cardsData.characters[characterKey]['spriteCoordinates'];
      charCaracteristics = app.cardsData.characters[characterKey]['caracteristics'];
      // Card container
      const cardElem = document.createElement('div');
      boardElem.appendChild(cardElem);
      cardElem.className = 'card-container';
      // Card image
      const cardFrontElem = document.createElement('div');
      cardElem.appendChild(cardFrontElem);
      cardFrontElem.className = 'card-front';
      cardFrontElem.style.backgroundPosition = `${100 * column / (app.cardsSpriteColumns - 1)}% ${100 * row / (app.cardsSpriteRows - 1 )}%`;
      // Card title
      const cardTitleElem = document.createElement('div');
      cardFrontElem.appendChild(cardTitleElem);
      cardTitleElem.className = 'card-front__title';
      cardTitleElem.innerText = charName;
      // Card details (on hover)
      const cardDetailsElem = document.createElement('div');
      cardElem.appendChild(cardDetailsElem);
      cardDetailsElem.className = 'card-back';
      cardDetailsElem.innerText = 'test';
      // Show/hide cards details when hovering
      cardElem.addEventListener('mouseover', () => {
        cardFrontElem.style.visibility = 'hidden';
        cardDetailsElem.style.visibility = 'visible';
      })
      cardElem.addEventListener('mouseleave', () => {
        cardFrontElem.style.visibility = 'visible';
        cardDetailsElem.style.visibility = 'hidden';
      })
    }

    // Drawing the board
    console.log(app.cardsData);
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
