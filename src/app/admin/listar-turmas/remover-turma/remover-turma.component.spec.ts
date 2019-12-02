import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoverTurmaComponent } from './remover-turma.component';

describe('RemoverTurmaComponent', () => {
  let component: RemoverTurmaComponent;
  let fixture: ComponentFixture<RemoverTurmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoverTurmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoverTurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
