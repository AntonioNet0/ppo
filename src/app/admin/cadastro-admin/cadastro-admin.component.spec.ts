import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAdminComponent } from './cadastro-admin.component';

describe('CadastroAdminComponent', () => {
  let component: CadastroAdminComponent;
  let fixture: ComponentFixture<CadastroAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
