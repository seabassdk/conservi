
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorridaTableComponent } from './corrida-table.component';

describe('CorridaTableComponent', () => {
  let component: CorridaTableComponent;
  let fixture: ComponentFixture<CorridaTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CorridaTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorridaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
