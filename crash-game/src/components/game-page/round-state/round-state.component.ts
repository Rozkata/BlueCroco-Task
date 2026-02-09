import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import {
  ERoundLifecycleState,
  IGameState,
} from '../../../models/game-states.model';
import { MultiplierColorPipe } from '../pipes/multiplier-color.pipe';

@Component({
  selector: 'app-round-state',
  standalone: true,
  imports: [CommonModule, MultiplierColorPipe],
  templateUrl: './round-state.component.html',
  styleUrl: './round-state.component.scss',
})
export class RoundStateComponent {
  gameState = input<IGameState>();

  ERoundLifecycleState = ERoundLifecycleState;
}
