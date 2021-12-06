import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaplotypesPanelComponent } from './haplotypes-panel.component';

describe('HaplotypesPanelComponent', () => {
  let component: HaplotypesPanelComponent;
  let fixture: ComponentFixture<HaplotypesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaplotypesPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HaplotypesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
