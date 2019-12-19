import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioAlunoComponent } from './horario-aluno.component';

describe('HorarioAlunoComponent', () => {
  let component: HorarioAlunoComponent;
  let fixture: ComponentFixture<HorarioAlunoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioAlunoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
