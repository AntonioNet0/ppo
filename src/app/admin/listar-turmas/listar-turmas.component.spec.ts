import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTurmasComponent } from './listar-turmas.component';

describe('ListarTurmasComponent', () => {
  let component: ListarTurmasComponent;
  let fixture: ComponentFixture<ListarTurmasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarTurmasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTurmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
