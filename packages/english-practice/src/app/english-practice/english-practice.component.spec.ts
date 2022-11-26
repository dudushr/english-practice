import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishPracticeComponent } from './english-practice.component';

describe('EnglishPracticeComponent', () => {
  let component: EnglishPracticeComponent;
  let fixture: ComponentFixture<EnglishPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnglishPracticeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EnglishPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
