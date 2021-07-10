import { WebsocketService } from 'src/app/services/websocket.service';
import { ApiService } from './../../services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { DataShareService } from 'src/app/services/data-share.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';

interface house {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {
  changed:number;
  loading=true;
  allHouses: house[] = [];
  times=[
    {value:1000,viewValue:'1s'},
    {value:2000,viewValue:'2s'},
    {value:5000,viewValue:'5s'},
    {value:10000,viewValue:'10s'},
    {value:30000,viewValue:'30s'},
    {value:60000,viewValue:'1m'},
];
cStatus=[
  {value:1,viewValue:'دستی'},
  {value:2,viewValue:'خودکار'},
];
selected = 0;
tsel=1000;
scSelect=1;
myDate = '';
  constructor(private datePipe: DatePipe,private dataService:DataShareService,private ws:WebsocketService,
    private api:ApiService,public translate: TranslateService) {
      this.myDate = formatDate(new Date(), 'fullDate', 'en');
  }

  ngOnInit(): void {
    this.tsel=this.ws.selecte_time;
    this.dataService.changes.subscribe(
      (data) => {
        this.changed =data;
        this.loading=false;
      }
    );
    this.loading=false;
    this.getSelectionData();
  }

  getSelectionData(){
    this.allHouses=this.ws.homes;
    this.selected=this.ws.selected_port;
    
  }


  onTimeChange(ob) {
    let selectedTime = ob.value;
    if (selectedTime!=this.ws.selecte_time) {
      this.ws.selecte_time=selectedTime;
      this.ws.sendMessage(selectedTime,true,true);
    }

  }

  onHomeChange(ob) {
    let selectedPort = ob.value;
    if (selectedPort!=this.ws.selected_port) {
      this.ws.selected_port=selectedPort;
      this.ws.close()
      this.ws.runSocket(selectedPort);
    }
    
  }

}
