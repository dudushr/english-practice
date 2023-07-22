import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'myorg-english-practice-selector',
  templateUrl: './english-practice-selector.component.html',
  styleUrls: ['./english-practice-selector.component.scss'],
})
export class EnglishPracticeSelectorComponent implements OnInit {
  practiceTypeControl = new FormControl('Reading');

  constructor() {}

  ngOnInit(): void {}
}
