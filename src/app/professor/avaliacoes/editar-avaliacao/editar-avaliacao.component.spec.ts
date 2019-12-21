import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAvaliacaoComponent } from './editar-avaliacao.component';

describe('EditarAvaliacaoComponent', () => {
  let component: EditarAvaliacaoComponent;
  let fixture: ComponentFixture<EditarAvaliacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarAvaliacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAvaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
