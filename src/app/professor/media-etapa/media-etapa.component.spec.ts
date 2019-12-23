import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaEtapaComponent } from './media-etapa.component';

describe('MediaEtapaComponent', () => {
  let component: MediaEtapaComponent;
  let fixture: ComponentFixture<MediaEtapaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaEtapaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaEtapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
