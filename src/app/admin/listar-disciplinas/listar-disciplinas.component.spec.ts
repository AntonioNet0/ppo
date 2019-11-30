import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDisciplinasComponent } from './listar-disciplinas.component';

describe('ListarDisciplinasComponent', () => {
  let component: ListarDisciplinasComponent;
  let fixture: ComponentFixture<ListarDisciplinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarDisciplinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarDisciplinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
