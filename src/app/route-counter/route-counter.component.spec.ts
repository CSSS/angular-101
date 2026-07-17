import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteCounterComponent } from './route-counter.component';

describe('RouteCounter', () => {
  let component: RouteCounterComponent;
  let fixture: ComponentFixture<RouteCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteCounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RouteCounterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
