import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictationSummaryComponent } from './dictation-summary.component';

describe('DictationSummaryComponent', () => {
  let component: DictationSummaryComponent;
  let fixture: ComponentFixture<DictationSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DictationSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DictationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
