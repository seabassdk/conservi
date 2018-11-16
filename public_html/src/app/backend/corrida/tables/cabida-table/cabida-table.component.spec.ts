
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabidaTableComponent } from './cabida-table.component';

describe('CabidaTableComponent', () => {
  let component: CabidaTableComponent;
  let fixture: ComponentFixture<CabidaTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CabidaTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabidaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
