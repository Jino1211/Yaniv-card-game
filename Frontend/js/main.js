"use strict";
import { suits, imgSrcs, ranks } from "./cards.js";
// import { Players, Card, PlayerDeck, PileDeck, TableDeck } from "./classes.js";
const startBtn = getElemFromDom("#start");

function createNewDeck() {
  const NewDeck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      NewDeck.push(new Card(suits[i], ranks[j], imgSrcs[i]));
    }
  }
  NewDeck.push(new Card("black-Joker", null, "Black_joker", true));
  NewDeck.push(new Card("red-Joker", null, "Red_joker", true));
  return NewDeck;
}

class Players {
  constructor() {}

  firstMove() {
    for (let i = 1; i <= 4; i++) {
      const hand = players[i].myHand;
      for (let j = 0; j < hand.length; j++) {
        const domPlayer = getElemFromDom(`#p${i}`);
        const img = createElementOnDom(
          "img",
          "src",
          `cards-svg/${hand[j].imgSrc}`,
          domPlayer
        );
        addAnotherAttribute(img, "class", "card");
        addAnotherAttribute(img, "alt", `${hand[j].rank} ${hand[j].suit}`);
      }
    }
  }
}
const players = new Players();

class Card {
  constructor(suit, rank, imgSrc, isJoker = false) {
    this.suit = suit;
    this.rank = rank;
    this.isJoker = isJoker;
    if (!isJoker) {
      this.imgSrc = `${rank}${imgSrc}`;
    } else {
      this.imgSrc = `${imgSrc}`;
    }
  }
}

class Deck {
  constructor() {
    this.deck = createNewDeck();
  }
  shuffle() {
    this.deck.sort(() => Math.random() - 0.5);
  }
}

class PlayerDeck extends Deck {
  constructor(playerId, deck) {
    super();
    this.id = playerId;
    this.myHand = [];
    for (let i = 0; i < 5; i++) {
      this.myHand.push(deck.deck.pop());
    }
    delete this.deck;
    players[this.id] = this;
  }

  playCard(card) {
    for (let i = 0; i < this.myHand.length; i++) {
      if (
        (this.myHand[i].suit === card.suit) &
        (this.myHand[i].rank === card.rank)
      ) {
        createElementOnDom(
          "img",
          "src",
          card.imgSrc,
          getElemFromDom(this.playerId)
        );
        console.log(this.myHand[i]);
        this.myHand.splice(i, 1);
      }
    }
    return card;
  }
}

class PileDeck extends Deck {
  constructor(deck) {
    super();
    this.deck = deck;
  }

  insertToPile(card) {
    if (!card) {
      console.log(this.deck);
      card = this.deck;
    }
    this.deck[this.deck.length - 1] = card;
    const parent = getElemFromDom("#dealer");
    const onDom = createElementOnDom(
      "img",
      "src",
      `cards-svg/${card.imgSrc}`,
      parent
    );
    addAnotherAttribute(onDom, "class", "card");
    addAnotherAttribute(onDom, "alt", `${card.rank} ${card.suit}`);
    players.firstMove();
  }
}

class TableDeck extends Deck {
  constructor() {
    super();

    // this.deck = deck
  }

  InitGame(numberOfPlayer) {
    if (numberOfPlayer > 10) {
      console.log("To many players");
      return;
    }

    for (let i = 0; i < numberOfPlayer; i++) {
      new PlayerDeck(i + 1, this);
    }

    const pileDeck = new PileDeck(this.deck.pop());
    pileDeck.insertToPile();
    const tableBack = createElementOnDom(
      "img",
      "src",
      `cards-svg/Card_back`,
      getElemFromDom("#dealer")
    );
    addAnotherAttribute(tableBack, "alt", "back deck");
    addAnotherAttribute(tableBack, "class", "card");
  }

  drawCard(playerId) {
    players[playerId].myHand.push(this.deck.pop());
  }
}

function getElemFromDom(element) {
  return document.querySelector(element);
}

function createElementOnDom(
  element,
  attribute,
  attributeValue,
  parent,
  text,
  holder
) {
  let onDom = document.createElement(element);
  if ((element === "img") & (parent.id === "p2" || parent.id === "p3")) {
    onDom.setAttribute(attribute, `${attributeValue}R.svg`);
  } else {
    onDom.setAttribute(attribute, `${attributeValue}.svg`);
  }

  if (text) onDom.innerText = text;

  if (holder) {
    onDom.setAttribute("placeholder", holder);
  }

  parent.append(onDom);
  // if (element === "img") addEventToCard();
  return onDom;
}

// function rotateCard(img) {
//   img.style.transform = "rotate(90deg)";
//   img.style.width = "110%";
//   img.style.height = "13%";
// }
// function addEventToCard(img) {
//   img.addEventListener("click", () => {});
// }

function hideElement(element) {
  element.style.visibility = "hidden";
}

startBtn.addEventListener("click", () => {
  let tableDeck = new TableDeck();
  console.log(tableDeck);
  // tableDeck.shuffle();
  hideElement(startBtn);
  const parents = getElemFromDom("#pre-game-form");
  const numOfPlayer = createElementOnDom(
    "input",
    "id",
    "num-of-player",
    parents,
    null,
    "How many players?"
  );

  const confirmBtn = createElementOnDom(
    "button",
    "id",
    "num-of-players-btn",
    parents,
    "Confirm"
  );

  console.log(confirmBtn);
  confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    tableDeck.shuffle();
    tableDeck.InitGame(numOfPlayer.value);
    hideElement(numOfPlayer);
    hideElement(confirmBtn);
  });
});

function addAnotherAttribute(element, attribute, attributeValue) {
  element.setAttribute(attribute, attributeValue);
}
