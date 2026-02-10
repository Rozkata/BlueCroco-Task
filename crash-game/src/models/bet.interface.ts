export interface PlacedBet {
  gameRoundId: number;
  amount: number;
  isFreeBet: boolean;
  sequence: number;
  betIndex: number;
  autoCashoutMultiplier: number | undefined;
}
