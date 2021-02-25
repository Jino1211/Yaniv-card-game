const players = [];
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

function createNewDeck() {
  const NewDeck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      NewDeck.push(new Card(suits[i], ranks[j]));
    }
  }
  NewDeck.push(new Card(null, null, true));
  NewDeck.push(new Card(null, null, true));
  return NewDeck;
}

class Deck {
  constructor() {
    this.deck = createNewDeck();
  }
  shuffle() {
    this.deck.sort(() => Math.random() - 0.5);
  }

  InitDividingCards(numberOfPlayer) {
    if (numberOfPlayer > 10) {
      console.log("To many players");
      return;
    }

    for (let i = 0; i < numberOfPlayer; i++) {
      new PlayerDeck(i, this);
    }
    return players;
  }
}
let b = new Deck();

class PlayerDeck extends Deck {
  constructor(playerId, deck) {
    super();
    this.id = playerId;
    this.myHand = [];
    for (let i = 0; i < 5; i++) {
      this.myHand.push(deck.deck.pop());
    }
    delete this.deck;
    players.push(this);
  }
}

class TableDeck extends Deck {
  constructor(deck) {
    super(deck);
  }

  drawCard(player) {
    player.myHand.push(this.deck(pop));
  }
}
b.shuffle();
b.InitDividingCards(4);
console.log(players[0]);
