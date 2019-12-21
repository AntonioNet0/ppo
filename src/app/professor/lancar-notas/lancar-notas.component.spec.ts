import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LancarNotasComponent } from './lancar-notas.component';

describe('LancarNotasComponent', () => {
  let component: LancarNotasComponent;
  let fixture: ComponentFixture<LancarNotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LancarNotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LancarNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
