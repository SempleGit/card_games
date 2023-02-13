import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Deck } from './deck';
import { Card } from './card';
import { Draw } from './draw';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  deckCount: number = 1;

  constructor(private http: HttpClient) { }

  newDeck(): Observable<Deck> {
    return this.http.get<Deck>(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${this.deckCount}`)
  }

  drawCard(deckId: string): Observable<Draw> {
    return this.http.get<Draw>(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
  }
}
