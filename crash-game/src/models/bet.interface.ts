export interface PlacedBet {
  gameRoundId: number;
  amount: number;
  isFreeBet: boolean;
  sequence: number;
  betIndex: number;
  autoCashoutMultiplier: number | undefined;
}

export interface CashoutBet {
  betReferenceId: string;
  partialCashout: boolean;
  sequence: number;
}
