import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { AccountDetails } from '../model/account.model';
import { AccountService } from '../services/account.service';
declare const alertify: any;

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accountFromGroup!: FormGroup
  operationFormGroup!: FormGroup
  currentPage: number = 0
  size: number = 5
  accountObservable!: Observable<AccountDetails>
  errorMessage!: string

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.accountFromGroup = this.formBuilder.group({
      accountId: this.formBuilder.control(null)
    })

    this.operationFormGroup = this.formBuilder.group({
      operationType: this.formBuilder.control(null, [Validators.required]),
      amount: this.formBuilder.control(0, [Validators.required]),
      description: this.formBuilder.control(null, [Validators.required]),
      accountDestination: this.formBuilder.control(null)
    })
  }

  handleSearchAccount() {
    let id: string = this.accountFromGroup.value.accountId

    this.accountObservable = this.accountService.getAccount(id, this.currentPage, this.size).pipe(
      catchError(err => {
        this.errorMessage = err.message
        return throwError(err)
      })
    )
  }
  goToPage(page: number) {
    this.currentPage = page
    this.handleSearchAccount()
  }
  next() {
    this.currentPage++
    this.handleSearchAccount()
  }
  previous() {
    this.currentPage--
    this.handleSearchAccount()
  }

  handleAccountOperation() {
    let accountId: string = this.accountFromGroup.value.accountId
    let operationType = this.operationFormGroup.value.operationType
    let amount: number = this.operationFormGroup.value.amount
    let description: string = this.operationFormGroup.value.description
    let accountDestination: string = this.operationFormGroup.value.accountDestination

    if (operationType == "DEBIT") {
      this.accountService.debit(accountId, amount, description).subscribe({
        next: data => {
          alertify.success("Debit done successfully!")
          this.operationFormGroup.reset()
          this.handleSearchAccount()
        },
        error: err => {
          alert(err.message)
        }
      })
    } else if (operationType == "CREDIT") {
      this.accountService.credit(accountId, amount, description).subscribe({
        next: data => {
          alertify.success("Credit done successfully!")
          this.operationFormGroup.reset()
          this.handleSearchAccount()
        },
        error: err => {
          alert(err)
        }
      })

    } else if (operationType == "TRANSFER") {
      this.accountService.transfer(accountId, accountDestination, amount, description).subscribe({
        next: data => {
          alertify.success("Transfer done successfully!")
          this.operationFormGroup.reset()
          this.handleSearchAccount()
        },
        error: err => {
          alert(err)
        }
      })
    }
  }
}

