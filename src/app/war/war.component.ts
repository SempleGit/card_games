import { Component } from '@angular/core';
import { forkJoin, lastValueFrom } from 'rxjs';
import { NgModel } from '@angular/forms';
import { Card } from '../card';
import { CardService } from '../card-service';
import { Deck } from '../deck';
import { Draw } from '../draw';
import { Player } from '../player';

@Component({
  selector: 'app-war',
  templateUrl: './war.component.html',
  styleUrls: ['./war.component.css']
})
export class WarComponent {
  deck: Deck = {
    "success": true,
    "deck_id": "jfmdm1gevuue",
    "remaining": 52,
    "shuffled": true
  };

  cardValues: string[] = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE"
  ]

  card?: Card;
  draw?: Draw;

  player1: Player = {
    name: 'Elena',
    pile: 'p1_pile',
  }

  player2: Player = {
    name: 'Daddy',
    pile: 'p2_pile',
  }

  winner?: Player;

  playedCards: Card[] = [];

  constructor(private cardService: CardService) {

  }

  ngOnInit(): void {
    this.getDeck();
  }

  drawCard(): void {
    this.cardService.drawCard(this.deck.deck_id).subscribe(draw => {
      this.draw = draw;
      this.card = draw.cards[0];
    })
  }

  async playCards(): Promise<void> {
    await lastValueFrom(this.cardService.playCard(this.deck.deck_id, this.player1.pile)).then(draw => {
      this.player1.currentCard = draw.cards[0]
      this.playedCards.push(draw.cards[0])
    });
    await lastValueFrom(this.cardService.playCard(this.deck.deck_id, this.player2.pile)).then(draw => {
      this.player2.currentCard = draw.cards[0]
      this.playedCards.push(draw.cards[0])
    });
    this.handleRound();
  }

  handleRound(): void {

    if (this.player1.currentCard &&
      this.player2.currentCard &&
      this.cardValues.indexOf(this.player1.currentCard.value) > this.cardValues.indexOf(this.player2.currentCard.value)) {
      this.winner = this.player1;
    } else {
      this.winner = this.player2;
    }
    // Add the winning cards to the winning player's hand, clears the playedCards array.
    this.cardService.addToHand(this.deck.deck_id, this.winner.pile, this.playedCards.splice(0).map(card => card.code).join()).subscribe(res => console.table(res.piles));
  }

  dealCards(): void {
    let p1: string[] = [];
    let p2: string[] = [];
    this.cardService.drawCard(this.deck.deck_id, 52).subscribe(draw => {
      this.draw = draw;
      for (let i = 0; i < draw.cards.length; i++) {
        i % 2 === 0 ? p1.push(draw.cards[i].code) : p2.push(draw.cards[i].code);
      }
      this.cardService.addToHand(this.deck.deck_id, this.player1.pile, p1.join()).subscribe(res => {
        this.cardService.addToHand(this.deck.deck_id, this.player2.pile, p2.join()).subscribe(res => console.log(res))
      })
    });
  }

  getDeck(): void {
    this.cardService.newDeck().subscribe(deck => this.deck = deck);
  }

  shuffleDeck(): void {
    this.cardService.reshuffleDeck(this.deck.deck_id).subscribe(res => console.log(res));
  }

}
