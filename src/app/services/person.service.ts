import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin, catchError, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {


  constructor(private http: HttpClient) { }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/json/person.json");
  }

  public getXML(): Observable<any> {
    return this.http.get('./assets/xml/personXML.xml', { responseType: 'text' });
  }

  getPersons() {
    return forkJoin({
      fromJSON: this.getJSON().pipe(delay(5000)),
      fromXML: this.getXML().pipe(delay(10000))
    }).pipe(
      catchError(err => of(err))
    );
  }


}
