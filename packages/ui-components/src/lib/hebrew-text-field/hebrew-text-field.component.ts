import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'myorg-hebrew-text-field',
  templateUrl: './hebrew-text-field.component.html',
  styleUrls: ['./hebrew-text-field.component.scss'],
})
export class HebrewTextFieldComponent implements OnInit {
  @Input() value = "";
  @Output() keyUp = new EventEmitter<string>();
  @Output() enterPressed = new EventEmitter<string>();
  @Output() Blur = new EventEmitter<string>();

  @ViewChild('txtHebrew') txtHebrew!: ElementRef;
  

  ngOnInit(): void {
    console.log("start")
  }

  onKeyHebrewWord($event: any){
    if($event.code == "Enter"){
      this.enterPressed.emit(this.value);
    }else{
      this.value = this.getHebrewString($event.target.value);
      this.keyUp.emit(this.value);
    }
  }

  onHebrewWordBlur(){
    this.Blur.emit(this.value);
  }

  getHebrewString(str: string): string{
    const en = ['p', 'o', 'i', 'u', 'y', 't', 'r', 'e', 'l', 'k', 'j', 'h', 'g', 'f', 'd', 's', 'a', 'm', 'n', 'b', 'v', 'c', 'x', 'z', ',', '.'];
    const heb = ['פ', 'ם', 'ן', 'ו', 'ט', 'א' ,'ר', 'ק', 'ך', 'ל', 'ח', 'י', 'ע', 'כ', 'ג', 'ד', 'ש', 'צ', 'מ', 'נ', 'ה' ,'ב', 'ס', 'ז', 'ת', 'ץ'];
    for(let i=0; i<en.length; i++){
      str = str.replace(en[i], heb[i]);
    }
  
    return str;
  }


  getHebrewChar(ch: string): string{
    switch(ch){
      case 'p': return 'פ';
      case 'o': return 'ם';
      case 'i': return 'ן';
      case 'u': return 'ו';
      case 'y': return 'ט';
      case 't': return 'א';
      case 'r': return 'ר';
      case 'e': return 'ק';
      case 'l': return 'ך';
      case 'k': return 'ל';
      case 'j': return 'ח';
      case 'h': return 'י';
      case 'g': return 'ע';
      case 'f': return 'כ';
      case 'd': return 'ג';
      case 's': return 'ד';
      case 'a': return 'ש';
      case 'm': return 'צ';
      case 'n': return 'מ';
      case 'b': return 'נ';
      case 'v': return 'ה';
      case 'c': return 'ב';
      case 'x': return 'ס';
      case 'z': return 'ז';
      
    }

     return '';
  }


 public focus(): void{
  this.txtHebrew.nativeElement.focus();
 }

}
