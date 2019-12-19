import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostarMaterialComponent } from './postar-material.component';

describe('PostarMaterialComponent', () => {
  let component: PostarMaterialComponent;
  let fixture: ComponentFixture<PostarMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostarMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostarMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
