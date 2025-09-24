import { Component, signal } from '@angular/core';
import {HistoricalMapComponent} from './components/historical-map-component/historical-map-component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    HistoricalMapComponent
  ],
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
