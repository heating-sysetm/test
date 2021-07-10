import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  date:string;

  constructor(public translate: TranslateService){
   //   let now = moment(); // add this 2 of 4
     //navigator.language || navigator.userLanguage; 

 //var test = moment('2016-01-24 14:23:45');

       //ja-JP;
 //de-DE
    setInterval(() =>{
   const currentDate = new Date();
   this.date = currentDate.toLocaleTimeString();
   if (this.translate.currentLang=='fa') {
    this.date=this.date.replace('PM','ب.ظ');
    this.date=this.date.replace('AM','ب.ظ');
   }   
    }, 1000);
  }

  ngOnInit(): void {
  }
}