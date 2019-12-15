import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarCalendarioAcademicoComponent } from './visualizar-calendario-academico.component';

describe('VisualizarCalendarioAcademicoComponent', () => {
  let component: VisualizarCalendarioAcademicoComponent;
  let fixture: ComponentFixture<VisualizarCalendarioAcademicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarCalendarioAcademicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarCalendarioAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
