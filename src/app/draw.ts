import { Card } from "./card";

export interface Draw {
  success: boolean,
  deck_id: string,
  cards: Card[],
  piles?: {
    p1_pile: { remaining: number },
    p2_pile: { remaining: number }
  },
  remaining: Number
}
