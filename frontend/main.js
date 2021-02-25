const suits = ["spades", "diamonds", "clubs", "hearts"];
const ranks = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

class Card {
  constructor(suit, rank, isJoker = false) {
    this.suit = suit;
    this.rank = rank;
    this.isJoker = isJoker;
  }
}

class Deck {
  constructor() {
    this.deck = [];
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        this.deck.push(new Card(suits[i], ranks[j]));
      }
    }
    this.deck.push(new Card(null, null, true));
    this.deck.push(new Card(null, null, true));
  }

  shuffle() {
    return this.deck.sort(() => Math.random() - 0.5);
  }
}

let b = new Deck();
console.log(b.shuffle());

function PlayerDeck(playerId) {}
