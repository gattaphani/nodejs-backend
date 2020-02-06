import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http:HttpClient) { }
  baseUrl:string='http://localhost:3000/user';
  
  
  getAll() {
    return this.http.get(this.baseUrl+'/get')
  }
  create(countries) {
    return this.http.post(this.baseUrl+'/add',countries)
  }
  edit(id) {
    return this.http.get(this.baseUrl+'/edit/'+id)
  }
  update(id,countries) {
    return this.http.put(this.baseUrl+'/update/'+id,countries)
  }
  delete(id) {
    return this.http.delete(this.baseUrl+'/delete/'+id)
  }
 
}
