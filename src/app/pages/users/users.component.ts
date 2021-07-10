import { DialogData } from './../../components/side-nav/side-nav.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog,MatDialogClose } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from './../../services/api.service';
import { NotificationService } from './../../services/notification.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
export interface User {
  name: string;
  username: string;
  password: string;
  id: string;
  phone: string;
  email: string;
  isAdmin: boolean;
}
const ELEMENT_DATA: User[] = [];
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  name="";
  displayedColumns: string[] = [
    'name',
    'username',
    'phone',
    'password',
    'isAdmin',
    'sendSMS',
    'delete',
  ];
  dataSource = [];
  public userForm: FormGroup;
  public loading = false;
  constructor(public dialog: MatDialog,
    private notif: NotificationService,
    private _formBuilder: FormBuilder,
    private api: ApiService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.userForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      isAdmin: [false, Validators.required],
      sendSMS: [false, Validators.required],
    });
  }

  check() {
    if (this.userForm.controls.name.invalid) {
      this.notif.createError(
        'خطا',
        'نام و نام خانوادگی به درستی وارد نشده است'
      );
      return false;
    } else if (this.userForm.controls.password.invalid) {
      this.notif.createError('خطا', 'نام کاربری به درستی وارد نشده است');
      return false;
    } else if (this.userForm.controls.password.invalid) {
      this.notif.createError('خطا', 'نام کاربری به درستی وارد نشده است');
      return false;
    }
    return true;
  }

  addUser() {
    // console.log(this.translate.currentLang);

    if (this.check()) {
      console.log(this.userForm.value);
      this.api.addUser(this.userForm.value).subscribe(
        (result) => {
          console.log('res', result);
          this.dataSource = this.dataSource.concat([result['data']]);
          this.notif.createSuccess('خطا', 'کاربر با موفقیت افزوده شد');
        },
        (err) => {
          console.log(err);
          this.notif.createError('خطا', 'امکان افزودن کاربر وجود ندارد');
        }
      );
    }
  }

  getAllUsers() {
    this.api.getusers().subscribe((result) => {
      console.log(result['data']);
      this.dataSource = result['data'];
    });
  }

  deleteUser(user) {

    this.api.deleteUser(user.id).subscribe(
      (result) => {
        this.notif.createSuccess('', 'کاربر با موفقیت حذف شد');
        const index: number = this.dataSource.indexOf(user);
        if (index !== -1) {
          let x = this.dataSource
            .slice(0, index)
            .concat(this.dataSource.slice(index + 1, this.dataSource.length));
          this.dataSource = x;
        }
      },
      (error) => {
        console.log(error);

        this.notif.createError(
          'خطا',
          'کاربر حذف نشد لطفا دوباره امتحان کنید'
        );
      }
    );

  }

  openDialog(user): void {
    const dialogRef = this.dialog.open(DialogOverviewDialog, {
      width: '250px',
      data: {name: user.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteUser(user);
      }
    });
  }



}



@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    flag=true;
  onNoClick(): void {
    this.dialogRef.close();
  }

}