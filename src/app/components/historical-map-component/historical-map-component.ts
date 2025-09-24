import * as L from 'leaflet';
import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HistoryEventService} from '../../services/HistoryEventService';
import {HistoryEvent} from '../../models/HistoryEvent';

@Component({
  selector: 'app-historical-map-component',
  imports: [
    FormsModule
  ],
  templateUrl: './historical-map-component.html',
  styleUrl: './historical-map-component.css'
})
export class HistoricalMapComponent implements OnInit {
  private map!: L.Map
  private markers: L.LayerGroup = L.layerGroup();
  year: number = 2020;
  events: HistoryEvent[] = [];

  private customIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  });

  constructor(private historyEventService: HistoryEventService) {}

  ngOnInit() {
    this.map = L.map('map').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    this.markers.addTo(this.map);

    // Load and display historical borders from GeoJSON - TODO
    fetch('assets/historical_borders.geojson')
      .then(response => response.json())
      .then(data => {
        L.geoJSON(data).addTo(this.map);
      });

    this.onYearChange();
  }

  onYearChange() {
    if (this.year) {
      this.historyEventService.getEventsByYear(this.year).subscribe({
        next: (events) => {
          this.events = events;
          this.updateMarkers();
        },
        error: (err) => console.error(err)
      });
    }
  }

  private updateMarkers() {
    this.markers.clearLayers();

    this.events.forEach(event => {
      if (event.latitude && event.longitude) {
        const marker = L.marker([event.latitude, event.longitude], { icon: this.customIcon }) //
          .bindPopup(`<b>${event.title}</b><br>${event.country}`);
        this.markers.addLayer(marker);
      }
    });
  }
}
