import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../_models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  baseUrl = 'https://localhost:44347/api/';
  constructor(private http: HttpClient) {}

  getContacts() {
    return this.http.get<Contact[]>('https://localhost:44347/api/contact');
  }

  getContact(id: string) {
    return this.http.get<Contact>('https://localhost:44347/api/contact/' + id);
  }

  saveNewContact(contact: Contact) {
    return this.http.post(
      'https://localhost:44347/api/contact/add-contact',
      contact
    );
  }

  updateContact(id: string, contact: Contact) {
    console.log(id);
    return this.http.post(
      'https://localhost:44347/api/contact/update-contact?id=' + id,
      contact
    );
  }
}
