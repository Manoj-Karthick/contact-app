import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Contact } from '../_models/contact';
import { ContactService } from '../_services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  contacts: Contact[] = [];

  sortedData: Contact[] = [];

  addOrEdit = false;
  constructor(
    private router: Router,
    private contactService: ContactService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts() {
    this.contactService.getContacts().subscribe({
      next: (response) => {
        console.log(response);
        this.contacts = response;
        this.sortedData = this.contacts.slice();
      },
      error: (error) => console.log(error),
    });
  }

  sortData(sort: Sort) {
    const data = this.contacts.slice();
    if (!sort.active || sort.direction === '') {
      this.contacts = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'firstName':
          return compare(a.firstName, b.firstName, isAsc);
        case 'lastName':
          return compare(a.lastName, b.lastName, isAsc);
        case 'email':
          return compare(a.email, b.email, isAsc);
        case 'phoneNumber':
          return compare(a.phoneNumber, b.phoneNumber, isAsc);
        case 'address':
          return compare(a.address, b.address, isAsc);
        case 'city':
          return compare(a.city, b.city, isAsc);
        case 'state':
          return compare(a.state, b.state, isAsc);
        case 'country':
          return compare(a.country, b.country, isAsc);
        case 'postalCode':
          return compare(a.postalCode, b.postalCode, isAsc);
        default:
          return 0;
      }
    });

    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }
}
