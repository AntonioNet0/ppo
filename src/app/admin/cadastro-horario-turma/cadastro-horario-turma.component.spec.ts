import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroHorarioTurmaComponent } from './cadastro-horario-turma.component';

describe('CadastroHorarioTurmaComponent', () => {
  let component: CadastroHorarioTurmaComponent;
  let fixture: ComponentFixture<CadastroHorarioTurmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroHorarioTurmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroHorarioTurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
