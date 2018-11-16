import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabidaEditComponent } from './cabida-edit.component';

describe('CabidaEditComponent', () => {
  let component: CabidaEditComponent;
  let fixture: ComponentFixture<CabidaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabidaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabidaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
