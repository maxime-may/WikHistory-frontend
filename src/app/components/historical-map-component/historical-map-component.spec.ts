import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalMapComponent } from './historical-map-component';

describe('HistoricalMapComponent', () => {
  let component: HistoricalMapComponent;
  let fixture: ComponentFixture<HistoricalMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricalMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricalMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
