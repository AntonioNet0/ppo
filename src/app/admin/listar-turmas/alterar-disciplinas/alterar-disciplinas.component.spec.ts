import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarDisciplinasComponent } from './alterar-disciplinas.component';

describe('AlterarDisciplinasComponent', () => {
  let component: AlterarDisciplinasComponent;
  let fixture: ComponentFixture<AlterarDisciplinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarDisciplinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarDisciplinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
