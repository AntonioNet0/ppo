import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopoAlunoComponent } from './topo-aluno.component';

describe('TopoAlunoComponent', () => {
  let component: TopoAlunoComponent;
  let fixture: ComponentFixture<TopoAlunoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopoAlunoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopoAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
