import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryStatisticsComponent } from './dictionary-statistics.component';

describe('DictionaryStatisticsComponent', () => {
  let component: DictionaryStatisticsComponent;
  let fixture: ComponentFixture<DictionaryStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DictionaryStatisticsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DictionaryStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
