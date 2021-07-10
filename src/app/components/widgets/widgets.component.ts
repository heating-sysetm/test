import { Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DataShareService } from 'src/app/services/data-share.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
export interface Chart{
  id:string,
  power:boolean,
  temp:number,
  temp2:number,
  num:number,
  color:number,
  modal:string
}
@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss'],
})
export class WidgetsComponent implements OnInit {
  boylers:Array<any>;
  list:Chart[]=[
    {
      id:'boyler1',
      power:true,
      temp:23,
      temp2:45,
      num:1,
      color:4,
      modal:"#modal1"
    }
    ,
    {
      id:'boyler-2',
      power:false,
      temp:44,
      temp2:45,
      num:2,
      color:9,
      modal:"#modal2"
    },
    {
      id:'boyler-3',
      power:true,
      temp:50,
      temp2:45,
      num:3,
      color:8,
      modal:"#modal3"
    },
    {
      id:'boyler-4',
      power:true,
      temp:70,
      temp2:45,
      num:4,
      color:5,
      modal:"#modal4"
    }
  ]
  constructor(private dataService:DataShareService,private api:ApiService) {
  }

  ngOnInit(): void {
    var count:any=0;
    this.dataService.boylers.subscribe((boylers) => {
      for (let index = 0; index < boylers.length; index++) {
        if (boylers[index]['data']!==null) {
          this.list[index].temp = boylers[index]['data'];
        // this.list[index].id = boylers[index]['name'];
        count+=1;
        }
        
      }
      this.boylers=new Array(count).fill(1)
      count=0;
      
    });
  }


}
