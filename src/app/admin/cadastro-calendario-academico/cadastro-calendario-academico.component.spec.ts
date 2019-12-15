import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCalendarioAcademicoComponent } from './cadastro-calendario-academico.component';

describe('CadastroCalendarioAcademicoComponent', () => {
  let component: CadastroCalendarioAcademicoComponent;
  let fixture: ComponentFixture<CadastroCalendarioAcademicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroCalendarioAcademicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroCalendarioAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
