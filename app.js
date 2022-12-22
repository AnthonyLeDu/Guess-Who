/**
 * Switch the first letter of the given string to uppercase.
 * @param {String} s String to process.
 * @returns {String} A new string with first character in upper case.
 */
const capitalized = function (s) {
  if (s.length === 0) return '';
  if (s.length === 1) return s.charAt(0).toUpperCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Replace special characters in the given string 
 * by the provided replacement string.
 * @param {String} s String to process.
 * @param {String} replacement Replacement string
 * @returns {String} A new string
 */
const replaceSpecialCharacters = function (s, replacement) {
  return s.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, replacement);
}

const kebabCased = function (s) {
  return replaceSpecialCharacters(s, '-').toLowerCase();
}

const camelCased = function (s, uppercased) {
  let newString = replaceSpecialCharacters(s, '_');
  return uppercased ? newString.toUpperCase() : newString;
}

const app = {
  debug: false,
  options: [
    {
      caption: 'Player\'s color',
      type: 'radio',
      choices: [
        { caption: 'Blue', callback: () => { app.setPlayerColor('blue'); }, checked: true },
        { caption: 'Red', callback: () => { app.setPlayerColor('red'); } },
        { caption: 'Green', callback: () => { app.setPlayerColor('green'); } },
        { caption: 'Purple', callback: () => { app.setPlayerColor('purple'); } }
      ]
    }
  ],

  playerColor: '',
  cardsData: {},
  cardsSpriteColumns: 8,
  cardsSpriteRows: 3,

  initOptions() {
    // Filling the options pannel
    const optionsPanelElem = document.getElementById('options-panel');
    for (appOption of app.options) {
      // Main option container
      const optionItemElem = document.createElement('li');
      optionItemElem.className = 'options-item';
      optionsPanelElem.appendChild(optionItemElem);
      // Option caption
      const optionItemCaptionElem = document.createElement('p');
      optionItemElem.appendChild(optionItemCaptionElem);
      optionItemCaptionElem.innerText = appOption.caption;
      optionItemCaptionElem.className = 'options-item__title';
      // Option radio switch container
      const optionItemRadioSwitchElem = document.createElement('div');
      optionItemElem.appendChild(optionItemRadioSwitchElem);
      optionItemRadioSwitchElem.className = 'radio-switch';
      optionItemRadioSwitchElem.style.setProperty('--switch-positions', appOption.choices.length);
      // Selection feedback element
      const optionSelectionElem = document.createElement('div');
      optionItemRadioSwitchElem.appendChild(optionSelectionElem);
      optionSelectionElem.className = 'radio-switch__selection';
      // Adding one input per choice
      appOption.choices.forEach((optionChoice, index) => {
        // Radio input
        const choiceInputElem = document.createElement('input');
        choiceInputElem.setAttribute('type', 'radio');
        choiceInputElem.setAttribute('id', kebabCased(`${appOption.caption} ${optionChoice.caption}`));
        choiceInputElem.setAttribute('name', kebabCased(appOption.caption));
        optionItemRadioSwitchElem.appendChild(choiceInputElem);
        choiceInputElem.className = 'radio-switch__input'
        // Radio label
        const choiceLabelElem = document.createElement('label');
        choiceLabelElem.setAttribute('for', kebabCased(`${appOption.caption} ${optionChoice.caption}`));
        optionItemRadioSwitchElem.appendChild(choiceLabelElem);
        choiceLabelElem.className = 'radio-switch__label';
        choiceLabelElem.innerText = optionChoice.caption;
        // Input click listener
        choiceInputElem.addEventListener('click', () => {
          optionItemRadioSwitchElem.style.setProperty('--current-index', index);
          // Callback
          optionChoice.callback();
        });
        // If option is checked
        if (optionChoice.checked) {
          choiceInputElem.setAttribute('checked', true);
          optionChoice.callback(); // we trigger the callback at startup
        }
      });
    };
    // Options button callback
    document.getElementById('options__button').addEventListener('click', (event) => {
      optionsPanelElem.classList.toggle('options-panel--hidden');
      event.target.classList.toggle('options__button--activated');
    })
  },

  setPlayerColor(color) {
    app.playerColor = color;
    app.updateGameStyle();
  },

  updateGameStyle() {
    const rootElem = document.querySelector(':root');
    // Set the player's color variable
    rootElem.style.setProperty('--player-color-h', `var(--player-color-h-${app.playerColor}`);
  },

  drawSecretCard() {
    const appElem = document.getElementById('app');
    // Randomly pick a character's key
    const keys = Object.keys(app.cardsData.characters);
    const characterKey = keys[ keys.length * Math.random() << 0];
    // Create the card
    appElem.appendChild(app.createCard(characterKey, true));
  },

  createCard(characterKey, isSecretCard) {
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
        cardBackSpecLineElem.innerText = `${capitalized(spec)} = `;
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
    cardElem.className = 'card-container';
    cardElem.classList.add( isSecretCard ? 'card-container--secret' : 'card-container--board');

    // Car inner (for the flipping effect)
    const cardInnerElem = document.createElement('div');
    cardElem.appendChild(cardInnerElem);
    cardInnerElem.className = 'card';

    // When cardElem is clicked, toggle the cardInnerElem active class
    cardElem.addEventListener('click', () => {
      cardInnerElem.classList.toggle('card--inactive');
    })

    // Card front (character face)
    const cardFrontElem = document.createElement('div');
    cardInnerElem.appendChild(cardFrontElem);
    cardFrontElem.className = 'card-front';
    [column, row] = app.cardsData.characters[characterKey]['spriteCoordinates'];
    cardFrontElem.style.backgroundPosition = `${100 * column / (app.cardsSpriteColumns - 1)}% ${100 * row / (app.cardsSpriteRows - 1)}%`;

    // Card front title (character name)
    const cardTitleElem = document.createElement('div');
    cardFrontElem.appendChild(cardTitleElem);
    cardTitleElem.className = 'card-front__title';
    cardTitleElem.innerText = capitalized(characterKey);

    // Card details (debug-only)
    if (app.debug) addDetails(cardFrontElem);

    // Card back
    const cardBackElem = document.createElement('div');
    cardInnerElem.appendChild(cardBackElem);
    cardBackElem.className = `card-back card-back--${app.playerColor}`;

    const cardBackImageElem = document.createElement('div');
    cardBackElem.appendChild(cardBackImageElem);
    cardBackImageElem.className = 'card-back__image';

    return cardElem;
  },

  redrawBoard() {
    // Drawing the board
    const boardElem = document.getElementById('board');
    
    // Adding the cards
    for (charKey in app.cardsData.characters) {
      boardElem.appendChild(app.createCard(charKey, false));

    }
  },

  async init() {
    app.initOptions();
    // Read cards data
    app.cardsData = await fetch("./data/cards.json").then(response => response.json());
    // Edit the CSS depending on the app options
    app.updateGameStyle();
    // Redraw board
    app.redrawBoard();
    // Pick the player's secret card
    app.drawSecretCard();
  }
}


document.addEventListener('DOMContentLoaded', app.init);
