import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishPracticeWritingComponent } from './english-practice-writing.component';

describe('EnglishPracticeWritingComponent', () => {
  let component: EnglishPracticeWritingComponent;
  let fixture: ComponentFixture<EnglishPracticeWritingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnglishPracticeWritingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EnglishPracticeWritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
