import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const SERVER = 'http://localhost:8000/contact/';

export class Contactus {


  constructor(
    public subject: string,
    public comment: string,
    public email: string
  ){}

}


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient
  ) { }

  postContact(contact) {
    return this.http.post<Contactus>(SERVER,contact);
  }
}


