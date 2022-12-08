const app = {

  cardsWidth: 94.75,
  carsHeight: 173.4,


  init() {
    // Drawing the board
    console.log(cards);
    const boardElem = document.getElementById('board');

    cards.forEach((cardsRow, row) => {
      const cardRowElem = document.createElement('div');
      cardRowElem.className = 'card-row';
      boardElem.appendChild(cardRowElem);
      cardsRow.forEach((card, column) => {
        const cardElem = document.createElement('div');
        cardElem.className = 'card';
        cardElem.style.width = `${app.cardsWidth}px`;
        cardElem.style.height = `${app.carsHeight}px`;
        cardElem.style.backgroundPosition = `-${app.cardsWidth * column}px -${app.carsHeight * row}px`;
        cardRowElem.appendChild(cardElem);
      })
    })
  }
}


document.addEventListener('DOMContentLoaded', app.init);
