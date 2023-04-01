import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'myorg-dictation-summary',
  templateUrl: './dictation-summary.component.html',
  styleUrls: ['./dictation-summary.component.scss'],
})
export class DictationSummaryComponent implements OnInit {
  @Output() onStartNewDictation = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  startDictation(){
    this.onStartNewDictation.emit("startDictation");
  }
}
