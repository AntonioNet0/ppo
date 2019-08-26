import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAlunoComponent } from './login-aluno.component';

describe('LoginAlunoComponent', () => {
  let component: LoginAlunoComponent;
  let fixture: ComponentFixture<LoginAlunoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginAlunoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
