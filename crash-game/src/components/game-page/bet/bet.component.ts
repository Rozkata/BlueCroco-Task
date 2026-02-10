import { Component, effect, input, output, signal } from '@angular/core';
import {
  ERoundLifecycleState,
  IActiveRoundState,
  IGameBetStateTransactionData,
} from '../../../models/game-states.model';
import { CashoutBet, PlacedBet } from '../../../models/bet.interface';

@Component({
  selector: 'app-bet',
  standalone: true,
  imports: [],
  templateUrl: './bet.component.html',
  styleUrl: './bet.component.scss',
})
export class BetComponent {
  roundState = input<IActiveRoundState>();
  debitState = input<IGameBetStateTransactionData>();

  placedBet = output<PlacedBet>();
  closeBet = output<CashoutBet>();

  betPlaced = signal<boolean>(false);

  ERoundLifecycleState = ERoundLifecycleState;

  constructor() {
    this.resetBetState();
  }

  handlePlaceBet(): void {
    const bet = this.buildBet();

    if (!bet) {
      window.alert('Unable to place bet at this time. Please try again later.');

      return;
    }
    this.betPlaced.set(true);
    this.placedBet.emit(bet);
  }

  // Behavior for cancel is wrong, but since it occurs after a bet is placed, I decided to leave it as a close bet
  handleCloseBet(): void {
    const bet = this.buildCloseBet();

    if (!bet) {
      window.alert('Unable to close bet at this time. Please try again later.');

      return;
    }

    this.betPlaced.set(false);
    this.closeBet.emit(bet);
  }

  private buildBet(): PlacedBet | undefined {
    const roundState = this.roundState();
    if (!roundState) {
      return undefined;
    }

    return {
      gameRoundId: roundState.roundId,
      amount: 1.0,
      isFreeBet: false,
      sequence: 0,
      betIndex: 0,
      autoCashoutMultiplier: undefined,
    };
  }

  private buildCloseBet(): CashoutBet | undefined {
    const creditState = this.debitState();

    if (!creditState) {
      return undefined;
    }

    return {
      betReferenceId: creditState.betReferenceId,
      partialCashout: false,
      sequence: 1,
    };
  }

  private resetBetState(): void {
    effect(
      () => {
        if (
          this.roundState()?.gameState?.currentAction ===
            this.ERoundLifecycleState.RoundFinished &&
          this.betPlaced()
        ) {
          this.betPlaced.set(false);
        }
      },
      { allowSignalWrites: true },
    );
  }
}
