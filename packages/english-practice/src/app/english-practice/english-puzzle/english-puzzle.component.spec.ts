import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishPuzzleComponent } from './english-puzzle.component';

describe('EnglishPuzzleComponent', () => {
  let component: EnglishPuzzleComponent;
  let fixture: ComponentFixture<EnglishPuzzleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnglishPuzzleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EnglishPuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
