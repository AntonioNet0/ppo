import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBoletimComponent } from './home-boletim.component';

describe('HomeAlunoComponent', () => {
  let component: HomeBoletimComponent;
  let fixture: ComponentFixture<HomeBoletimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBoletimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBoletimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
