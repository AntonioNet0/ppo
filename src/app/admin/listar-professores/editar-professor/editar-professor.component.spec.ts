import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProfessorComponent } from './editar-professor.component';

describe('EditarProfessorComponent', () => {
  let component: EditarProfessorComponent;
  let fixture: ComponentFixture<EditarProfessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarProfessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
