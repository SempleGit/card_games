import { Component } from '@angular/core';
import { Card } from '../card';
import { CardService } from '../card-service';
import { Deck } from '../deck';
import { Draw } from '../draw';

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

  card?: Card;
  draw?: Draw;

  constructor(private cardService: CardService) {

  }

  ngOnInit(): void {
    this.getDeck();
  }

  drawCard() {
    this.cardService.drawCard(this.deck.deck_id).subscribe(draw => {
      this.draw = draw;
      this.card = draw.cards[0];
    })
  }

  getDeck(): void {
    this.cardService.newDeck().subscribe(deck => this.deck = deck);
  }

}
