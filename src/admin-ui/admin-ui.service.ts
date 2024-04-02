import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminUiService {

  constructor(private http:HttpClient) { }

  getAdminUiDetailes(){
    const url = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    return this.http.get(url);
  }
}
