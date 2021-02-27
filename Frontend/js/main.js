"use strict";
import { suits, imgSrcs, ranks } from "./cards.js";
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
        const img = createElementOnDom("img", "src", hand[j].imgSrc, domPlayer);
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
      this.imgSrc = `${rank}${imgSrc}.jpg`;
    } else {
      this.imgSrc = `${imgSrc}.jpg`;
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
    const onDom = createElementOnDom("img", "src", card.imgSrc, parent);
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

  InitDividingCards(numberOfPlayer) {
    if (numberOfPlayer > 10) {
      console.log("To many players");
      return;
    }

    for (let i = 0; i < numberOfPlayer; i++) {
      new PlayerDeck(i + 1, this);
    }

    const pileDeck = new PileDeck(this.deck.pop());
    pileDeck.insertToPile();
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
  onDom.setAttribute(attribute, attributeValue);

  if (text) onDom.innerText = text;

  if (holder) {
    onDom.setAttribute("placeholder", holder);
  }

  parent.append(onDom);
  return onDom;
}

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
    tableDeck.InitDividingCards(numOfPlayer.value);
    hideElement(numOfPlayer);
    hideElement(confirmBtn);
  });
});

function addAnotherAttribute(element, attribute, attributeValue) {
  element.setAttribute(attribute, attributeValue);
}
// function insertCard()
// function convertCardToImg(card) {}
// t.shuffle();
// t.InitDividingCards(3);

// let d = { suit: "hearts", rank: "3", isJoker: false };
// console.log(players[2]);
// console.log(players[2].playCard(d));
