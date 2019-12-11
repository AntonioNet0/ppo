import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarSenhaProfessorComponent } from './atualizar-senha-professor.component';

describe('AtualizarSenhaProfessorComponent', () => {
  let component: AtualizarSenhaProfessorComponent;
  let fixture: ComponentFixture<AtualizarSenhaProfessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtualizarSenhaProfessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarSenhaProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
