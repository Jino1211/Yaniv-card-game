// class Players {
//   constructor() {}

//   firstMove() {
//     for (let i = 1; i <= 4; i++) {
//       const hand = players[i].myHand;
//       for (let j = 0; j < hand.length; j++) {
//         const domPlayer = getElemFromDom(`#p${i}`);
//         const img = createElementOnDom("img", "src", hand[j].imgSrc, domPlayer);
//         addAnotherAttribute(img, "class", "card");
//         addAnotherAttribute(img, "alt", `${hand[j].rank} ${hand[j].suit}`);
//       }
//     }
//   }
// }

// class Card {
//   constructor(suit, rank, imgSrc, isJoker = false) {
//     this.suit = suit;
//     this.rank = rank;
//     this.isJoker = isJoker;
//     if (!isJoker) {
//       this.imgSrc = `${rank}${imgSrc}.jpg`;
//     } else {
//       this.imgSrc = `${imgSrc}.jpg`;
//     }
//   }
// }

// class Deck {
//   constructor() {
//     this.deck = createNewDeck();
//   }
//   shuffle() {
//     this.deck.sort(() => Math.random() - 0.5);
//   }
// }

// class PlayerDeck extends Deck {
//   constructor(playerId, deck) {
//     super();
//     this.id = playerId;
//     this.myHand = [];
//     for (let i = 0; i < 5; i++) {
//       this.myHand.push(deck.deck.pop());
//     }
//     delete this.deck;
//     players[this.id] = this;
//   }

//   playCard(card) {
//     for (let i = 0; i < this.myHand.length; i++) {
//       if (
//         (this.myHand[i].suit === card.suit) &
//         (this.myHand[i].rank === card.rank)
//       ) {
//         createElementOnDom(
//           "img",
//           "src",
//           card.imgSrc,
//           getElemFromDom(this.playerId)
//         );
//         console.log(this.myHand[i]);
//         this.myHand.splice(i, 1);
//       }
//     }
//     return card;
//   }
// }

// class PileDeck extends Deck {
//   constructor(deck) {
//     super();
//     this.deck = deck;
//   }

//   insertToPile(card) {
//     if (!card) {
//       console.log(this.deck);
//       card = this.deck;
//     }
//     this.deck[this.deck.length - 1] = card;
//     const parent = getElemFromDom("#dealer");
//     const onDom = createElementOnDom("img", "src", card.imgSrc, parent);
//     addAnotherAttribute(onDom, "class", "card");
//     addAnotherAttribute(onDom, "alt", `${card.rank} ${card.suit}`);
//     players.firstMove();
//   }
// }

// class TableDeck extends Deck {
//   constructor() {
//     super();

//     // this.deck = deck
//   }

//   InitDividingCards(numberOfPlayer) {
//     if (numberOfPlayer > 10) {
//       console.log("To many players");
//       return;
//     }

//     for (let i = 0; i < numberOfPlayer; i++) {
//       new PlayerDeck(i + 1, this);
//     }

//     const pileDeck = new PileDeck(this.deck.pop());
//     pileDeck.insertToPile();
//   }

//   drawCard(playerId) {
//     players[playerId].myHand.push(this.deck.pop());
//   }
// }
// export { Players, Card, PlayerDeck, PileDeck, TableDeck, Deck };
