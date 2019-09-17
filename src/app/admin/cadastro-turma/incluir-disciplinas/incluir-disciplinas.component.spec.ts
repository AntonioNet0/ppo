import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncluirDisciplinasComponent } from './incluir-disciplinas.component';

describe('IncluirDisciplinasComponent', () => {
  let component: IncluirDisciplinasComponent;
  let fixture: ComponentFixture<IncluirDisciplinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncluirDisciplinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncluirDisciplinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
