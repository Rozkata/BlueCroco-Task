import { CommonModule } from '@angular/common';
import { Component, computed, inject, Signal } from '@angular/core';
import { SignalRHubService } from '../../services/signal-r-hub.service';
import { RoundStateComponent } from './round-state/round-state.component';
import { IGameState } from '../../models/game-states.model';
import { ConnectionState } from '../../models/connection-state.type';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [CommonModule, RoundStateComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
})
export class GamePageComponent {
  private readonly signalRHubService = inject(SignalRHubService);
  protected readonly gameState: Signal<IGameState | undefined> = computed(
    () => this.signalRHubService.roundState()?.gameState,
  );
  protected readonly connectionState: Signal<ConnectionState | undefined> =
    this.signalRHubService.connectionState;

  constructor() {
    this.signalRHubService.initializeConnection();
  }
}
