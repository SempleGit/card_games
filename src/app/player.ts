import { Card } from "./card"

export interface Player {
  name: string,
  pile: string,
  currentCard?: Card
}
