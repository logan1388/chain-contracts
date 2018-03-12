import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service'
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable }         from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  model: any = {};
  CreateForm = false;
  CreateBtn = false;
  Contracts: any = {};
  TxnRef = false;
  TransactionRef: number;
  TxnNo: any = {};
  role: string;
  username: string;
  
  constructor(    
    private http: HttpClient,    
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
) { 
  	this.TransactionRef = 0;
    this.Contracts = [];
  }

  ngOnInit() {
      this.role = localStorage.getItem('Role');
      this.username = localStorage.getItem('currentUser');
      console.log("Role: "+this.role);
      console.log("Username: "+this.username);
      if(this.role == 'Supplier')
        this.CreateBtn = false;
      else if(this.role == 'Enterprise')
        this.CreateBtn = true;
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
    this.http.post('http://54.83.145.216:3000/enterprise/create', {username: this.username, item: this.model.item, qty: this.model.qty, value: this.model.value})
    .subscribe(
      res => {
        console.log(res);
            this.Get();
      },
      err => {
        console.log("Error occured");
            this.Get();
      });
  	this.CreateForm = false;
  	//this.TxnRef = true;
  	//this.TransactionRef = 100;
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
    this.http.get<any>('http://54.83.145.216:3000/enterprise/contracts/'+this.username).subscribe(
        data => 
        {
          this.TxnRef = true;
          this.TransactionRef = data[data.length - 1].assetId;
        });
    }
    //console.log(Ref);       
  }