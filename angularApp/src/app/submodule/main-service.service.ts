import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainServiceService implements OnInit {
  val: any;
  loggedUser: any;
  signoutonoff: boolean = false;
  url = 'http://localhost:3000';
  changecityName: any = null;
  showdeleteforauthorizeduser: any;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    // this.val = localStorage.getItem('token');
  }
  fetchProfile(id: any) {
    this.val = localStorage.getItem('token');
    return this.http.get(
      `${this.url}/users/${id}`
      //   {
      //   headers: { Authorization: this.val },
      // }
    );
  }

  signinservice(data: any) {
    return this.http.post(`${this.url}/signin`, data);
  }
  signupservice(data: any) {
    return this.http.post(`${this.url}/signup`, data);
  }
  listoflhelprequest(skipNumber: number) {
    this.val = localStorage.getItem('token');
    console.log('this.val', this.val);
    return this.http.get(
      `${this.url}/helprequests/city/${skipNumber}?city=${this.changecityName}`
      // {
      //   headers: { Authorization: this.val },
      // }
    );
  }
  listoflserviceprovider(skipNumber: number) {
    this.val = localStorage.getItem('token');
    return this.http.get(
      `${this.url}/services/city/${skipNumber}?city=${this.changecityName}`
      // {
      //   headers: { Authorization: this.val },
      // }
    );
  }

  postservice(data: any) {
    this.val = localStorage.getItem('token');
    console.log('new post data', data);
    return this.http.post(
      `${this.url}/services?changecityName=${this.changecityName}`,
      { service: data }
      // {
      //   headers: { Authorization: this.val },
      // }
    );
  }
  postHelpRequest(data: any) {
    this.val = localStorage.getItem('token');
    console.log('new post data', data);
    return this.http.post(
      `${this.url}/helprequests?changecityName=${this.changecityName}`,
      { request: data }
      // {
      //   headers: { Authorization: this.val },
      // }
    );
  }
  addCommentToServiceProvider(id: any, data: any) {
    this.val = localStorage.getItem('token');
    return this.http.put(
      `${this.url}/services/${id}/comments`,
      { text: data }
      // {
      //   headers: { Authorization: this.val },
      // }
    );
  }
  addReplyToServiceComment(pid: any, cid: any, data: any) {
    this.val = localStorage.getItem('token');
    return this.http.put(
      `${this.url}/services/${pid}/comments/${cid}/reply`,
      { message: data }
      // {
      //   headers: { Authorization: this.val },
      // }
    );
  }

  //
  addCommentTohelprequest(id: any, data: any) {
    this.val = localStorage.getItem('token');
    return this.http.put(
      `${this.url}/helprequests/${id}/comments`,
      { text: data }
      // {
      //   headers: { Authorization: this.val },
      // }
    );
  }
  addReplyTohelprequestcomment(pid: any, cid: any, data: any) {
    this.val = localStorage.getItem('token');
    return this.http.put(
      `${this.url}/helprequests/${pid}/comments/${cid}/reply`,
      { message: data }
      // {
      //   headers: { Authorization: this.val },
      // }
    );
  }
  gethelprequestbyid(id: any) {
    this.val = localStorage.getItem('token');
    console.log('given id', id);
    return this.http.get(
      `${this.url}/helprequests/${id}`
      // {
      // headers: { Authorization: this.val },
      // }
    );
  }
  getserviceproviderbyid(id: any) {
    this.val = localStorage.getItem('token');
    console.log('given id', id);
    return this.http.get(
      `${this.url}/services/${id}`
      // {
      // headers: { Authorization: this.val },
      // }
    );
  }

  changecity(id: any, data: any) {
    this.val = localStorage.getItem('token');
    console.log('cirty change data', data);
    let citychange = { city: data };
    return this.http.put(
      `${this.url}/users/${id}`,
      citychange
      // {
      // headers: { Authorization: this.val },
      // }
    );
  }

  deleteserviceproviderbyid(id: any, email: any) {
    this.val = localStorage.getItem('token');
    console.log('given id', id);
    return this.http.delete(
      `${this.url}/services/${id}/${email}`
      // {
      // headers: { Authorization: this.val },
      // }
    );
  }
  deletehelprequestby(id: any, email: any) {
    console.log('given id', id);
    this.val = localStorage.getItem('token');
    return this.http.delete(
      `${this.url}/helprequests/${id}/${email}`
      // {
      // headers: { Authorization: this.val },
      // }
    );
  }
}
