import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HebrewTextFieldComponent } from './hebrew-text-field.component';

describe('HebrewTextFieldComponent', () => {
  let component: HebrewTextFieldComponent;
  let fixture: ComponentFixture<HebrewTextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HebrewTextFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HebrewTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
