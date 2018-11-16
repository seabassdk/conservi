import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorridaEditComponent } from './corrida-edit.component';

describe('CorridaEditComponent', () => {
  let component: CorridaEditComponent;
  let fixture: ComponentFixture<CorridaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorridaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorridaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
