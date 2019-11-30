import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoverDisciplinaComponent } from './remover-disciplina.component';

describe('RemoverDisciplinaComponent', () => {
  let component: RemoverDisciplinaComponent;
  let fixture: ComponentFixture<RemoverDisciplinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoverDisciplinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoverDisciplinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
