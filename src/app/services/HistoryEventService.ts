import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HistoryEvent} from '../models/HistoryEvent';

@Injectable({
  providedIn: 'root'
})
export class HistoryEventService {
  private apiUrl = 'http://localhost:8080/api/history_events';

  constructor(private http: HttpClient) {}

  getEventsByDate(date: string): Observable<HistoryEvent[]> {
    return this.http.get<HistoryEvent[]>(`${this.apiUrl}?date=${date}`);
  }

  getEventsByYear(year: number): Observable<HistoryEvent[]> {
    return this.http.get<HistoryEvent[]>(`${this.apiUrl}/year=${year}`);
  }
}
