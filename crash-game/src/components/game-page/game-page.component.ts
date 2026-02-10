import { CommonModule } from '@angular/common';
import { Component, computed, inject, Signal } from '@angular/core';
import { SignalRHubService } from '../../services/signal-r-hub.service';
import { RoundStateComponent } from './round-state/round-state.component';
import {
  IActiveRoundState,
  IGameBetStateTransactionData,
  IGameState,
} from '../../models/game-states.model';
import { ConnectionState } from '../../models/connection-state.type';
import { BetComponent } from './bet/bet.component';
import { CashoutBet, PlacedBet } from '../../models/bet.interface';
import { BluecrocoApiService } from '../../services/bluecroco-api.service';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [CommonModule, RoundStateComponent, BetComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
})
export class GamePageComponent {
  private readonly signalRHubService = inject(SignalRHubService);
  private readonly blueCrocoApiService = inject(BluecrocoApiService);

  protected readonly gameState: Signal<IGameState | undefined> = computed(
    () => this.signalRHubService.roundState()?.gameState,
  );

  protected readonly roundState: Signal<IActiveRoundState | undefined> =
    this.signalRHubService.roundState;

  protected readonly connectionState: Signal<ConnectionState | undefined> =
    this.signalRHubService.connectionState;

  protected readonly debitState: Signal<
    IGameBetStateTransactionData | undefined
  > = this.signalRHubService.debitState;

  constructor() {
    this.signalRHubService.initializeConnection();
  }

  handlePlacedBet(bet: PlacedBet): void {
    this.blueCrocoApiService.placeBet(bet).subscribe({
      next: () => {
        console.log('Bet placed successfully');
      },
      error: (error) => {
        console.log('Error placing bet:', error);
      },
    });
  }

  handleCloseBet(bet: CashoutBet): void {
    this.blueCrocoApiService.cashoutBet(bet).subscribe({
      next: () => {
        console.log('Bet cashed out successfully');
      },
      error: (error) => {
        console.log('Error cashing out bet:', error);
      },
    });
  }
}
