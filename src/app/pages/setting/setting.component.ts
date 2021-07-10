import { TranslateService } from '@ngx-translate/core';
import { ApiService } from './../../services/api.service';
import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

interface Home {
  name: string;
  url: string;
  port: number;
  deviceCode: string;
}

const ELEMENT_DATA = [];

const HOME_DATA: Home[] = [];

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  displayedColumns: string[] = ['name', 'phone', 'delete'];
  homeDC: string[] = ['name', 'url', 'deviceCode', 'port','max','delete'];
  homeDS = [];
  dataSource = [];

  userForm: FormGroup;
  homeForm: FormGroup;
  
  constructor(
    private notif: NotificationService,
    private ffb: FormBuilder,
    private api: ApiService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    // this.dataSource = ELEMENT_DATA;
    this.getHomes();
    // this.homeDS=HOME_DATA;
    // a form for add homes
    this.homeForm = this.ffb.group({
      name: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      deviceCode: new FormControl('', Validators.required),
      port: new FormControl(Number, Validators.required),
      max:new FormControl(Number,Validators.required)
    });

  }
// user methods

  getAllUsers(){
    this.api.getSupervisors().subscribe(result=>{
      console.log(result);
        this.dataSource=result['data'];
    });
  }







  // home methods
  getHomes() {
    this.api.getHomes().subscribe(
      (result) => {
        let homes = result['data'];
        this.homeDS = homes;
      },
      (error) => {
        this.notif.createError(
          'خطا',
          'امکان افزودن داشبورد وجود ندارد. لطفا دوباره امتحان کنید'
        );
      }
    );
  }

  deleteHome(home) {
    this.api.deleteHome(home.id).subscribe(
      (result) => {
        this.notif.createSuccess('', 'داشبورد با موفقیت حذف شد');
        const index: number = this.homeDS.indexOf(home);
        if (index !== -1) {
          let x = this.homeDS
            .slice(0, index)
            .concat(this.homeDS.slice(index + 1, this.homeDS.length));
          this.homeDS = x;
        }
      },
      (error) => {
        this.notif.createError(
          'خطا',
          'داشبورد حذف نشد لطفا دوباره امتحان کنید'
        );
      }
    );
  }

  // call add home api
  addHome() {
    if (this.check()) {
      console.log(this.homeForm.value);
      this.api.addHome(this.homeForm.value).subscribe(
        (result) => {
          this.notif.createSuccess('', 'داشبورد با موفقیت افزوده شد');
          this.homeDS = this.homeDS.concat([result['data']]);
        },
        (err) => {
          this.notif.createError('خطا', 'امکان افزودن داشبورد وجود ندارد');
        }
      );
    }
  }

  // form controler
  check() {
    if (this.homeForm.controls.name.invalid) {
      this.notif.createError('خطا', 'نام به درستی وارد نشده است');
      return false;
    } else if (this.homeForm.controls.url.invalid) {
      this.notif.createError('خطا', 'مسیر به درستی وارد نشده است');
      return false;
    } else if (this.homeForm.controls.deviceCode.invalid) {
      this.notif.createError('خطا', ' کد دسنگاه به درستی وارد نشده است');
      return false;
    } else if (this.homeForm.controls.port.invalid) {
      this.notif.createError('خطا', ' پورت دستگاه به درستی وارد نشده است');
      return false;
    }
    return true;
  }

}
