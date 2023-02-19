import { Card } from "./card";

export interface Draw {
  success: boolean,
  deck_id: string,
  cards: Card[],
  remaining: Number
}
