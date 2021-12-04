import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgElementComponent } from './svg-element.component';

describe('SvgElementComponent', () => {
  let component: SvgElementComponent;
  let fixture: ComponentFixture<SvgElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO TEST: this.svg should be set after ngAfterViewInit
  // TODO TEST: this.plot should be set after ngAfterViewInit
  // TODO TEST: this.plotContentsGroup should be set after ngAfterViewInit
  // TODO TEST: mousePositionInfo should return correct info
});
