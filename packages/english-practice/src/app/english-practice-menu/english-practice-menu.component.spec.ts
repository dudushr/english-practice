import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishPracticeMenuComponent } from './english-practice-menu.component';

describe('EnglishPracticeMenuComponent', () => {
  let component: EnglishPracticeMenuComponent;
  let fixture: ComponentFixture<EnglishPracticeMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnglishPracticeMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EnglishPracticeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
