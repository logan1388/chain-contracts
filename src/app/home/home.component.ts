import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service'
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  model: any = {};
  CreateForm = false;
  Contracts: any = {};
  TxnRef = false;
  TransactionRef: number;
  TxnNo: any = {};
  
  constructor(    
    private http: HttpClient,    
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
) { 
  	this.TransactionRef = 0;
  	/*this.Contracts = [
    {
  	  "item":"1",
  	  "qty":1,
  	  "value":100
    },
    {
  	  "item":"2",
  	  "qty":1,
  	  "value":200
    }];*/
    this.Contracts = [];
  }

  ngOnInit() {
  	
  }

  Create(){
  	this.CreateForm = true;
  	this.TxnRef = false;
  }

  Submit(){
    this.Contracts.push({
      "username": "Wade",
      "item": this.model.item,
      "qty": this.model.qty,
      "value": this.model.value
    });
    this.TxnNo = this.http.post('http://54.83.145.216:3000/enterprise/create', {Contract: this.Contracts});
  	this.CreateForm = false;
  	this.TxnRef = true;
  	this.TransactionRef = 100;
  }

  Cancel(){
  	this.CreateForm = false;
  	this.TxnRef = false;
  }

  Logout(){
      this.authenticationService.logout();
      this.router.navigate(['Login']);
  }

  Get() {
    //this.http.get<any>('http://54.83.145.216:3000/enterprise/contracts/Wade');         
  }
}
