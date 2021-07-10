import { NotificationService } from './notification.service';
import { DataShareService } from 'src/app/services/data-share.service';
import { webSocket } from 'rxjs/webSocket';
import { Injectable } from '@angular/core';

@Injectable()
export class WebsocketService {
  subject: any;
  port: any;
  flag = true;
  selecte_time: number = 1000;
  selected_port: number;
  homes=[];
  constructor(private datash: DataShareService,private notif: NotificationService) {}


  
  runSocket(port) {
    this.port = port;
    this.subject = webSocket('ws://192.168.202.199:' + port);
    this.subject.subscribe(
      (result) => {
        console.log(result);
        
        if (result) {
          this.datash.changeOutTempData(result.outTemperature);
          this.datash.changeOutHumData(result.outHumidity);
          this.datash.changeOutputData(result.outPutTemperature);
          this.datash.changeInputData(result.inPutTemperature);
          this.datash.changeBoylersData([
            { data: result.boiler1 },
            { data: result.boiler2 },
            { data: result.boiler3 },
          ]);
          this.datash.changeCisternData(result.cistern);
          this.datash.changeGasData(result.gasSensor2);
          this.datash.changeMytext(5);
        }
        if (this.flag) {
          this.sendMessage(1000, true, true);
          this.flag = false;
        }
      },
      (err) => {
        this.notif.createError('خطا','اشکال در ارتباط با سرور');
      },
      () => {
        this.notif.createError('خطا',' ارتباط با سرور قطع شد');
      }
    );
    this.subject.onclose = function () {
      this.close();
    };
  }

  private getNewWebSocket(port) {
    console.log("webSocket('ws://localhost:'" + port);
    this.close();
    return webSocket('ws://localhost:' + port);
  }
  sendMessage(time: any, flag: any, changeTime: any) {
    this.subject.next(time);
    // this.runSocket(this.port);
  }
  close() {
    this.subject.complete();
    this.subject = null;
  }
}
