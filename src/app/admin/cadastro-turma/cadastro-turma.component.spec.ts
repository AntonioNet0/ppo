import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroTurmaComponent } from './cadastro-turma.component';

describe('CadastroTurmaComponent', () => {
  let component: CadastroTurmaComponent;
  let fixture: ComponentFixture<CadastroTurmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroTurmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroTurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
