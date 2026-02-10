import { Component, input, output } from '@angular/core';
import {
  ERoundLifecycleState,
  IActiveRoundState,
} from '../../../models/game-states.model';
import { PlacedBet } from '../../../models/bet.interface';

@Component({
  selector: 'app-bet',
  standalone: true,
  imports: [],
  templateUrl: './bet.component.html',
  styleUrl: './bet.component.scss',
})
export class BetComponent {
  roundState = input<IActiveRoundState>();
  betPlaced = output<PlacedBet>();

  ERoundLifecycleState = ERoundLifecycleState;

  handlePlaceBet(): void {
    const bet = this.buildBet();

    if (!bet) {
      window.alert('Unable to place bet at this time. Please try again later.');

      return;
    }
    this.betPlaced.emit(bet);
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
}
