import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadCounter } from './bad-counter.component';

describe('BadCounter', () => {
  let component: BadCounter;
  let fixture: ComponentFixture<BadCounter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadCounter],
    }).compileComponents();

    fixture = TestBed.createComponent(BadCounter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
