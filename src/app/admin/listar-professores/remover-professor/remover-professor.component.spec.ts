import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoverProfessorComponent } from './remover-professor.component';

describe('RemoverProfessorComponent', () => {
  let component: RemoverProfessorComponent;
  let fixture: ComponentFixture<RemoverProfessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoverProfessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoverProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
