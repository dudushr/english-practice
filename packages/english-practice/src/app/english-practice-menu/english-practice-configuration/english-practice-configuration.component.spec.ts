import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishPracticeConfigurationComponent } from './english-practice-configuration.component';

describe('EnglishPracticeConfigurationComponent', () => {
  let component: EnglishPracticeConfigurationComponent;
  let fixture: ComponentFixture<EnglishPracticeConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnglishPracticeConfigurationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EnglishPracticeConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
