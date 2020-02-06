import { Injectable } from '@angular/core';
// import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  endpoint: string = 'http://localhost:3000/user';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser: Object = {};

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  // Sign-up
  signUp(user): Observable<any> {
    let api = `${this.endpoint}/signup`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Sign-in
  signIn(user) {
    return this.http.post<any>(`${this.endpoint}/signin`, user)
      .subscribe((res: any) => {
        console.log('login res',res)
        alert('success')
        localStorage.setItem('access_token', res.token);
        this.getToken();
        this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res['email'];
        this.router.navigate(['/list']);
        })
      },
      (error)=>{
          alert(JSON.stringify(error.message)+'------------>'+'navigate to signup');
          this.router.navigate(['/signup']);
      })
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['/login']);
    }
  }

  //User profile
  
  getUserProfile(id): Observable<any> {
    let api = `${this.endpoint}/getbyid/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        this.currentUser = res;
        console.log('getbyid',res)
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
