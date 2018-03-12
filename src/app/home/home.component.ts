import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  CreateForm = false;
  Contracts: any = {};
  TxnRef = false;
  TransactionRef: number;
  
  constructor() { 
  	this.TransactionRef = 0;
  	this.Contracts = [
  {
  	"Item":"1",
  	"Quantity":1,
  	"Value":100
  },
  {
  	"Item":"2",
  	"Quantity":1,
  	"Value":200
  }];
  }

  ngOnInit() {
  	
  }

  Create(){
  	this.CreateForm = true;
  	this.TxnRef = false;
  }

  Submit(){
  	this.CreateForm = false;
  	this.TxnRef = true;
  	this.TransactionRef = 100;
  }

  Cancel(){
  	this.CreateForm = false;
  	this.TxnRef = false;
  }

}
