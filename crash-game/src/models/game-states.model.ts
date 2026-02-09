// FYI - Using "I" as a prefix in interfaces is no longer suggested by Typescript's docs
export interface IActiveRoundState {
  roundReferenceId: string;
  roundId: number;
  gameState: IGameState;
}

export interface IGameState {
  currentAction: ERoundLifecycleState;
  startTime: number;
  multiplier: number;
}

export enum ERoundLifecycleState {
  RoundCreated = 200,
  RoundRunning = 210,
  RoundFinished = 220,
  RoundRecovered = 230,
}

export interface IGameBetStateTransactionData extends IGameBetState {
  balance: number;
}

export interface IGameBetState {
  success: boolean;
  errorCode: number | null;
  betReferenceId: string;
  roundReferenceId: string;
  gameState: IGameState;
  //   betState: IBetState;
  sequence?: number;
  gameRoundId?: number;
}
