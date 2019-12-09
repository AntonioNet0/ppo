import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopoProfessorComponent } from './topo-professor.component';

describe('TopoProfessorComponent', () => {
  let component: TopoProfessorComponent;
  let fixture: ComponentFixture<TopoProfessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopoProfessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopoProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
