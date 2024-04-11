import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl="http://localhost:3000/users";

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get(`${this.baseUrl}`);
  }

  getUserById(id:any){
    return this.http.get(`${this.baseUrl}/${id}`)
  }
  createUser(user: object):Observable<Object>{
    return this.http.post(`${this.baseUrl}`,user);
  }

  updateUser(id:any, value:any){
    return this.http.put(`${this.baseUrl}/${id}`,value)
  }

  deleteUser(id:any){
    return this.http.delete(`${this.baseUrl}/${id}`,{responseType:'text'})
  }
}
