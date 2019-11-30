import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoverAlunoComponent } from './remover-aluno.component';

describe('RemoverAlunoComponent', () => {
  let component: RemoverAlunoComponent;
  let fixture: ComponentFixture<RemoverAlunoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoverAlunoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoverAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
