import { map } from 'rxjs/operators';
import { HttpInterceptor, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  headers:HttpHeaders;
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    this.headers= new HttpHeaders();
    
  }

// Homes APIes
  getHomes() {
    return this.http.get(`${environment.apiUrl}/homes/all`);
  }

  addHome(data) {
    return this.http.post(`${environment.apiUrl}/homes/add-home`, data );
  }

  updateHome(id,data) {
    return this.http.put(`${environment.apiUrl}/homes/`+id+`/edit-home`, { data });
  }

  deleteHome(id){
    return this.http.delete(`${environment.apiUrl}/homes/`+id+`/delete-home`);
  }

  // User APIes
  getusers() {
    return this.http.get(`${environment.apiUrl}/users`);
  }

  getSupervisors(){
    return this.http.get(`${environment.apiUrl}/users/supervisors`);
  }

  addUser(data) {
    return this.http.post(`${environment.apiUrl}/users/add-user`,data);
  }

  updateUser(id,data) {
    return this.http.put(`${environment.apiUrl}/users/`+id+`/edit-user`, { data });
  }

  deleteUser(id){
    return this.http.delete(`${environment.apiUrl}/users/`+id+`/delete-user`);
  }

  //sensors  values

  getGasValues(start_date,end_date){
    return this.http.post(`${environment.apiUrl}/homes/getGasValues`, {startDate:start_date,endDate:end_date} );
  }

  getCisternValues(start_date,end_date){
    return this.http.post(`${environment.apiUrl}/homes/getCisternValues`, {startDate:start_date,endDate:end_date} );
  }

  getBoilersValues(start_date,end_date){
    return this.http.post(`${environment.apiUrl}/homes/getBoylersValues`, {startDate:start_date,endDate:end_date} );
  }

  getInOutValues(start_date,end_date){
    return this.http.post(`${environment.apiUrl}/homes/getInOutValues`, {startDate:start_date,endDate:end_date} );
  }

  // notifs 


  getNotifs(){
    return this.http.get(`${environment.apiUrl}/homes/unread_notifs`);
  }

  readNotif(id){
    return this.http.put(`${environment.apiUrl}/homes/read_notif/`+id,{});
  }

}
