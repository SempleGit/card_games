import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Deck } from './deck';
import { Card } from './card';
import { Draw } from './draw';
import { Pile } from './pile';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  deckCount: number = 1;

  constructor(private http: HttpClient) { }

  newDeck(): Observable<Deck> {
    return this.http.get<Deck>(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${this.deckCount}`)
  }

  drawCard(deckId: string, count: number = 1): Observable<Draw> {
    return this.http.get<Draw>(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`);
  }

  addToHand(deckId: string, playerHand: string, card_code: string): Observable<Pile> {
    return this.http.get<Pile>(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/${playerHand}/add/?cards=${card_code}`);
  }

  playCard(deckId: string, playerHand: string, count: number = 1): Observable<Draw> {
    return this.http.get<Draw>(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/${playerHand}/draw/bottom/?count=${count}`)
  }

  reshuffleDeck(deckId: string) {
    return this.http.get<Deck>(`https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
  }

}
