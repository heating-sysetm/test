import { DataShareService } from './../../services/data-share.service';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  temp_data = [
    { id: 'cistern', title: 'مخزن آب مصرفی', data: [] },
    { id: 'boyler_1', title: 'دیگ شماره ۱', data: [] },
    { id: 'boyler_2', title: 'دیگ شماره ۲', data: [] },
    { id: 'boyler_3', title: 'دیگ شماره ۳', data: [] },
    { id: 'boyler_4', title: 'دیگ شماره 4', data: [] },
    
  ];

  temp_data2: any = {};
  showChart = false;
  constructor(private api: ApiService, private datashare: DataShareService) {}

  ngOnInit(): void {
    this.datashare.isChanged.subscribe((res) => {
      this.loadCharts();
    });
  }

  loadCharts() {
    this.api
      .getGasValues(
        this.datashare.start_time.value,
        this.datashare.end_time.value
      )
      .subscribe(
        (result) => {
          this.temp_data2 = {
            id: 'gas',
            title: 'میزان گازهای اشتعال آور',
            data: result['data'],
          };
          
        },
        (err) => {}
      );
    this.api
      .getCisternValues(
        this.datashare.start_time.value,
        this.datashare.end_time.value
      )
      .subscribe(
        (result) => {
          this.temp_data[0].data = result['data'];
        },
        (err) => {}
      );
      this.api
      .getBoilersValues(
        this.datashare.start_time.value,
        this.datashare.end_time.value
      )
      .subscribe(
        (result) => {
          this.temp_data[1].data = result['data'].boiler1;
          this.temp_data[2].data = result['data'].boiler2;
          this.temp_data[3].data = result['data'].boiler3;
          this.temp_data[4].data = result['data'].boiler4;
          if (this.temp_data[4].data.length>0) {
            this.showChart = true;
          }
          
        },
        (err) => {}
      );

      
  }
}
