import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service'
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  model: any = {};	
  loading = false;
  returnUrl: string;
  username: string;
  password: string;
  
  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
    ){}

  ngOnInit() {
// reset login status
        this.authenticationService.logout();
 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';    
      }

  login(){
  	this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
          data => {
            this.router.navigate(['']);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
            if(error.error != null){
              var role = error.error.text;
              let navigationExtras: NavigationExtras = {
                //queryParams: { 'role': role }
                fragment: role
              };
              this.router.navigate([''], role);
              //localStorage.setItem('currentUser', JSON.stringify({ username: this.model.username, password: 'Star124'}));
              localStorage.setItem('currentUser', this.model.username);
              localStorage.setItem('Role', role);
            }
          }
      );
    /*localStorage.setItem('currentUser', JSON.stringify({ username: 'Wade', password: 'Star124'}));
    this.router.navigate(['']);
    this.username = this.model.username;
    this.password = this.model.password;*/
  }

}