import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_security/app.secure';


const routes: Routes = [
	{ path: 'Login', component: LoginComponent },
	{ path: '', component: HomeComponent, data : {some_data : 'some value'} }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
export const routedComponents = [HomeComponent];