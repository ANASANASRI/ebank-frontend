import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountDetails } from '../model/account.model';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  public getCustomers(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(environment.backendHost + "/customers")
  }

  public searchCustomers(keyword: string): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(environment.backendHost + "/customers/search?keyword=" + keyword)
  }

  public saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(environment.backendHost + "/customers", customer)
  }

  public deleteCustomer(id: number): Observable<Customer> {
    return this.http.delete<Customer>(environment.backendHost + "/customers/" + id)
  }

  public editCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(environment.backendHost + "/customers/" + id, customer)
  }

  public getCustomerAccounts(id: number): Observable<Array<AccountDetails>> {
    return this.http.get<Array<AccountDetails>>(environment.backendHost + "/customers/" + id + "/accountsList")
  }
}
