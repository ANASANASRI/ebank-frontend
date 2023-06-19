import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';
declare let alertify: any;
@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  newCustomerFormGroup!: FormGroup
  errorMessage!: string

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.newCustomerFormGroup = this.formBuilder.group({
      name: this.formBuilder.control(null, [Validators.required, Validators.maxLength(12)]),
      email: this.formBuilder.control(null, [Validators.email, Validators.required])
    })
  }

  handleNewCustomer() {

    let customer: Customer = this.newCustomerFormGroup?.value
    this.customerService.saveCustomer(customer).subscribe({
      next: () => {
        alertify.success("Customer saved succesfully!")
        this.router.navigateByUrl("/customers")
      },
      error: err => this.errorMessage = err.message
    }
    )
  }

}
