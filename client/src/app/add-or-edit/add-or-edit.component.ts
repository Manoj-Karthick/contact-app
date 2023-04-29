import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ContactService } from '../_services/contact.service';

@Component({
  selector: 'app-add-or-edit',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.css'],
})
export class AddOrEditComponent implements OnInit {
  isAddContact = false;
  contactForm: FormGroup = new FormGroup({});
  contactId = '';

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.contactId = this.route.snapshot.paramMap.get('id') as string;
    if (this.contactId != null) {
      this.isAddContact = false;
      this.getContact(this.contactId);
    } else {
      this.isAddContact = true;
    }
    this.initializeForm();
  }

  initializeForm() {
    this.contactForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
      ]),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      postalCode: new FormControl('', [
        Validators.required,
        Validators.maxLength(6),
      ]),
    });
  }

  addContact() {
    this.contactService
      .saveNewContact(this.contactForm?.value)
      .subscribe(() => {
        console.log('Added contact');
        this.contactForm.reset();
        this.router.navigateByUrl('/');
      });
  }

  saveContact() {
    if (this.isAddContact) {
      this.addContact();
    } else {
      this.updateContact(this.contactId);
    }
  }

  getContact(id: string) {
    this.contactService.getContact(id).subscribe((response) => {
      this.contactForm.patchValue(response);
    });
  }

  updateContact(id: string) {
    this.contactService
      .updateContact(id, this.contactForm?.value)
      .subscribe(() => {
        console.log('Updated contact detail');
        this.router.navigateByUrl('/');
      });
  }
}
