import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from './../../services/notification.service';
import { ThemeService } from './../../theme/theme.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public userInfo: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public usernameErr = 0;
  public passErr = 0;
  lang='En';
  matcher = new MyErrorStateMatcher();
  constructor(
    private notif: NotificationService,
    private route: ActivatedRoute,
    private router: Router,public translate: TranslateService,
    private authenticationService: AuthenticationService,
    private _formBuilder: FormBuilder
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/pages/dashboard']);
    }
    this.userInfo = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      autoLogin: false,
    });
  }

  ngOnInit() {
    this.lang=this.translate.currentLang;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    // this.router.navigate(['/pages/dashboard']);
    // if (this.check()) {
    //   return;
    // }
    this.loading = true;
    // this.authenticationService
    //   .login(this.f.username.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe(
    //     (data) => {
          this.router.navigate(['/pages/dashboard']);
        // },
        // (error) => {
        //   if (this.translate.currentLang=='Fa') {
        //   this.notif.createError('خطا', 'نام کاربری و یا رمزعبور نادرست می باشد ');
        //   }else{
        //     this.notif.createError('Error', 'Username or password incorrect');
        //   }
          this.loading = false;
      //   }
      // );
  }

  check() {
    if(this.f.username.invalid || this.f.password.invalid){
    if (this.f.username.invalid) {
      this.usernameErr=1;
      if (this.translate.currentLang=='Fa') {
        this.notif.createError('خطا', 'نام کاربری به درستی وارد نشده است');
      }else{
        this.notif.createError('Error', 'Username is incorrect');
      }
      
    }
    if (this.f.password.invalid) {
      this.passErr=1;
      if (this.translate.currentLang=='Fa') {
        this.notif.createError('خطا', 'رمزعبور به درستی وارد نشده است');
      }else{
        this.notif.createError('Error', 'Password is incorrect');
      }
    }
      return true;
    
  }
    this.usernameErr=0;
    this.passErr=0;
    return false;
  }

  onOptionsSelected(value){
    console.log(value);
    
  }

  
  enLang() {
    this.lang="En";
    this.translate.use('En');
  }
  faLang() {
    this.lang="Fa";
    this.translate.use('Fa');
  }



  get f() {
    return this.userInfo.controls;
  }
}
