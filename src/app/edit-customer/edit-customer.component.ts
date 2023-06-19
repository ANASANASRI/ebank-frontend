import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';
declare let alertify: any;

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customerId!: number
  editCustomerFormGroup!: FormGroup
  customer!: Customer
  errorMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private customerService: CustomerService
  ) {
    this.customer = router.getCurrentNavigation()?.extras.state as Customer
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id']

    this.editCustomerFormGroup = this.formBuilder.group({
      name: this.formBuilder.control(this.customer.name, [Validators.required]),
      email: this.formBuilder.control(this.customer.email, [Validators.required, Validators.email])
    })
  }
  handleSaveEditedCustomer() {
    let customer: Customer = this.editCustomerFormGroup?.value
    this.customerService.editCustomer(this.customerId, customer).subscribe({
      next: () => {
        alertify.success("Customer edited!")
        this.router.navigateByUrl("/customers")
      },
      error: err => {
        this.errorMessage = err.message
      }
    })
  }
}
