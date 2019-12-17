import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarHorarioTurmaComponent } from './editar-horario-turma.component';

describe('EditarHorarioTurmaComponent', () => {
  let component: EditarHorarioTurmaComponent;
  let fixture: ComponentFixture<EditarHorarioTurmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarHorarioTurmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarHorarioTurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
