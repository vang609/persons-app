import { Component, OnInit } from '@angular/core';
import { Person } from './interfaces/person';
import { PersonService } from './services/person.service';
import * as xml2js from 'xml2js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'List Persons order by Id:';
  public _persons: Person[] = [];

  constructor(
    private personService: PersonService
  ) { }

  ngOnInit() {
    this.getPersons();
  }

  getPersons() {
    this.personService.getPersons().subscribe(resp => {
      this.addPersonFromJSON(resp.fromJSON.person);
      this.parseXml(resp.fromXML);
      this.sortPersons()
    });
  }

  addPersonFromJSON(persons: any) {
    persons.forEach((person: any) => {
      this._persons.push(person);
    });
  }

  parseXml(xmlString: string): void {
    const parser = new xml2js.Parser({ strict: false, trim: true });
    parser.parseString(xmlString, (err: any, resp: any) => {
      resp.PERSONS.PERSON.forEach((person: any) => {
        const { FIRSTNAME, ID, LASTNAME } = person;
        this._persons.push({
          id: parseInt(ID[0]),
          firstName: FIRSTNAME[0],
          lastName: LASTNAME[0]
        });
      });
    });
  }

  sortPersons() {
    this._persons.sort((a, b) => {
      return (a.id - b.id);
    });
  }

}
