const app = {
  cardsSpriteColumns: 8,
  cardsSpriteRows: 3,

  drawBoard() {
    // Drawing the board
    console.log(cards);
    const boardElem = document.getElementById('board');

    cards.forEach((cardsRow, row) => {
      // Rows
      const cardRowElem = document.createElement('div');
      boardElem.appendChild(cardRowElem);
      cardRowElem.className = 'card-row';

      cardsRow.forEach((card, column) => {
        // Cards
        // Card image
        const cardElem = document.createElement('div');
        cardRowElem.appendChild(cardElem);
        cardElem.className = 'card';
        cardElem.style.backgroundPosition = `${100 * column / (app.cardsSpriteColumns - 1)}% ${100 * row / (app.cardsSpriteRows - 1 )}%`;
        // Card title
        const cardTitleElem = document.createElement('div');
        cardElem.appendChild(cardTitleElem);
        cardTitleElem.className = 'card__title';
        cardTitleElem.innerText = "Toto";
      })
    })
  },

  init() {
    app.drawBoard();
  }
}


document.addEventListener('DOMContentLoaded', app.init);
