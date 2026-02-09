import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundStateComponent } from './round-state.component';

describe('RoundStateComponent', () => {
  let component: RoundStateComponent;
  let fixture: ComponentFixture<RoundStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoundStateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
