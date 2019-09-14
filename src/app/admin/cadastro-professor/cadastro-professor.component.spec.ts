import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroProfessorComponent } from './cadastro-professor.component';

describe('CadastroProfessorComponent', () => {
  let component: CadastroProfessorComponent;
  let fixture: ComponentFixture<CadastroProfessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroProfessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
