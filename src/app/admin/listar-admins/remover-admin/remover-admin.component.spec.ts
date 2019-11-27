import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoverAdminComponent } from './remover-admin.component';

describe('RemoverAdminComponent', () => {
  let component: RemoverAdminComponent;
  let fixture: ComponentFixture<RemoverAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoverAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoverAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
