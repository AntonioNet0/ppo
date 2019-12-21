import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarAvaliacaoComponent } from './criar-avaliacao.component';

describe('CriarAvaliacaoComponent', () => {
  let component: CriarAvaliacaoComponent;
  let fixture: ComponentFixture<CriarAvaliacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarAvaliacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarAvaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
