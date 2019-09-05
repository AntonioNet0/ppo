import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopoAdmComponent } from './topo-adm.component';

describe('TopoAdmComponent', () => {
  let component: TopoAdmComponent;
  let fixture: ComponentFixture<TopoAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopoAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopoAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
