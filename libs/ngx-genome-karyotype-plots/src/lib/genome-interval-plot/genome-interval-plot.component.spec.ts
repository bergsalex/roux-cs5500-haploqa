import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenomeIntervalPlotComponent } from './genome-interval-plot.component';

describe('GenomeIntervalPlotComponent', () => {
  let component: GenomeIntervalPlotComponent;
  let fixture: ComponentFixture<GenomeIntervalPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenomeIntervalPlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenomeIntervalPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
