import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';


@Injectable({
  providedIn: 'root'
})
export class ContactService {


  private apiUrl = 'http://localhost:5000/api/contacts';

  constructor(private http: HttpClient) { }

  // Trae la lista de contactos
  getContacts(types: number[] = []): Observable<Contact[]> {
    let url = this.apiUrl;
    if (types.length > 0) {
      url += `?types=${types.join(',')}`;
    }
    return this.http.get<Contact[]>(url);
  }

  createContact(contact: Partial<Contact>): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  updateContact(id: number, contact: Partial<Contact>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, contact);
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
