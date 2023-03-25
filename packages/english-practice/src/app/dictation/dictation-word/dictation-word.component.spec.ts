import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictationWordComponent } from './dictation-word.component';

describe('DictationWordComponent', () => {
  let component: DictationWordComponent;
  let fixture: ComponentFixture<DictationWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DictationWordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DictationWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
