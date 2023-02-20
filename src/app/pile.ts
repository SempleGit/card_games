export interface Pile {
  success: boolean,
  deck_id: string,
  remaining: number,
  piles: {
    p1_pile: { remaining: number },
    p2_pile: { remaining: number }
  }
}
