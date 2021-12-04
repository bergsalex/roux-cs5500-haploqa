import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenomeKaryotypePlotComponent } from './genome-karyotype-plot.component';
import {SvgElementComponent} from "../svg-element/svg-element.component";

describe('GenomeKaryotypePlotComponent', () => {
  let component: GenomeKaryotypePlotComponent;
  let fixture: ComponentFixture<GenomeKaryotypePlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenomeKaryotypePlotComponent, SvgElementComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenomeKaryotypePlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
