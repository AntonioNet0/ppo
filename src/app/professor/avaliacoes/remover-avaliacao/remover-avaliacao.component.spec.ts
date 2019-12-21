import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoverAvaliacaoComponent } from './remover-avaliacao.component';

describe('RemoverAvaliacaoComponent', () => {
  let component: RemoverAvaliacaoComponent;
  let fixture: ComponentFixture<RemoverAvaliacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoverAvaliacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoverAvaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
