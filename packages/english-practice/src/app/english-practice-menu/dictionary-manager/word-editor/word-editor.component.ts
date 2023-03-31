import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';




@Component({
  selector: 'myorg-word-editor',
  templateUrl: './word-editor.component.html',
  styleUrls: ['./word-editor.component.scss'],
})
export class WordEditorComponent implements OnInit {
  word = "";
  hebrew = ["פירוש 1", "פירוש 2", "פירוש 3"];


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.word = data.word;
  }

  ngOnInit(): void {}
}
