import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAdminsComponent } from './listar-admins.component';

describe('ListarAdminsComponent', () => {
  let component: ListarAdminsComponent;
  let fixture: ComponentFixture<ListarAdminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarAdminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
