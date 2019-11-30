import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDisciplinaComponent } from './editar-disciplina.component';

describe('EditarDisciplinaComponent', () => {
  let component: EditarDisciplinaComponent;
  let fixture: ComponentFixture<EditarDisciplinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarDisciplinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDisciplinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
