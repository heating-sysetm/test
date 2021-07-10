import { NotificationService } from './services/notification.service';
import { ApiService } from 'src/app/services/api.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { DataShareService } from 'src/app/services/data-share.service';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Heating-Monitoring-System';
  ss=true;
  constructor(private dataservice:DataShareService,private ws:WebsocketService,private api:ApiService,private notif: NotificationService,
    public translate: TranslateService){
    this.translate.addLangs(['En', 'Fa']);
    this.translate.setDefaultLang('En');
    this.translate.currentLang='En';
    this.getSelectionData();
  }

  changeData(){
    this.dataservice.changeMytext(5);
  }

  switchLang() {
    if(this.ss){
      this.ss=false;
      this.translate.use('En');
    }else{
      this.ss=true;
      this.translate.use('Fa');
    }
  }


  getSelectionData(){
    this.api.getHomes().subscribe(data=>{
      let port = data['data'][0].port;
      data['data'].forEach(home => {
        let temp={
          value:home.port,viewValue:home.name
        }
        this.ws.homes.push(temp);
      });
      this.ws.selected_port=port;
      this.ws.runSocket(port);
    },error=>{
      this.notif.createError('خطا','اشکال در ارتباط با سرور');
    });
  }


}
