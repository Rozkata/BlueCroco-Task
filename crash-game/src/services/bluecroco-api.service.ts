import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlacedBet } from '../models/bet.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BluecrocoApiService {
  private readonly endpoint =
    'https://rlgl-dev.bluecroco.com/api/1.0/crash-games';

  constructor(private httpClient: HttpClient) {}

  placeBet(bet: PlacedBet): Observable<void> {
    return this.httpClient.post<void>(
      `${this.endpoint}/request-place-bet`,
      bet,
      { headers: { Authorization: `${environment.sessionToken}` } },
    );
  }
}
