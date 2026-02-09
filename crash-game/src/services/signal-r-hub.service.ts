import { Injectable, signal } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import {
  ERoundLifecycleState,
  IActiveRoundState,
  IGameBetState,
} from '../models/game-states.model';
import { environment } from '../environments/environment';
import { ConnectionState } from '../models/connection-state.type';

@Injectable({
  providedIn: 'root',
})
export class SignalRHubService {
  private connection: HubConnection | undefined;

  readonly connectionState = signal<ConnectionState>('disconnected');
  readonly roundState = signal<IActiveRoundState | undefined>(undefined);

  constructor() {}

  initializeConnection(): void {
    this.connection = new HubConnectionBuilder()
      .withUrl('https://rlgl-dev.bluecroco.com/hubs/1.0/transactions', {
        accessTokenFactory: () => environment.sessionToken,
      })
      .withAutomaticReconnect([0, 1000, 3000, 5000])
      .build();

    this.startConnection();
    this.handleStates();
    this.handleRoundUpdate();
  }

  private startConnection(): void {
    this.connection?.start().then(() => {
      this.connectionState.set('connected');
    });
  }

  private handleStates(): void {
    this.connection?.onreconnecting(() => {
      this.connectionState.set('reconnecting');
    });

    this.connection?.onreconnected(() => {
      this.connectionState.set('connected');
    });

    this.connection?.onclose(() => {
      this.connectionState.set('disconnected');
    });
  }

  private handleRoundUpdate(): void {
    this.connection?.on('roundUpdate', (state: IActiveRoundState) => {
      this.roundState.set(state);
    });
  }
}
