import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotContainerComponent } from './plot-container.component';

describe('PlotContainerComponent', () => {
  let component: PlotContainerComponent;
  let fixture: ComponentFixture<PlotContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
