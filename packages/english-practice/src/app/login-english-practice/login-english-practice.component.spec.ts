import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEnglishPracticeComponent } from './login-english-practice.component';

describe('LoginEnglishPracticeComponent', () => {
  let component: LoginEnglishPracticeComponent;
  let fixture: ComponentFixture<LoginEnglishPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginEnglishPracticeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginEnglishPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
