import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishPracticeSelectorComponent } from './english-practice-selector.component';

describe('EnglishPracticeSelectorComponent', () => {
  let component: EnglishPracticeSelectorComponent;
  let fixture: ComponentFixture<EnglishPracticeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnglishPracticeSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EnglishPracticeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
